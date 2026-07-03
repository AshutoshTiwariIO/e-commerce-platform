import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/apiClient';
import { useAuth } from './AuthContext';

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchWishlist = useCallback(async () => {
    if (!user) { setWishlist([]); return; }
    try {
      setLoading(true);
      const res = await api.get('/wishlist');
      setWishlist(res.data);
    } catch { setWishlist([]); } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchWishlist(); }, [fetchWishlist]);

  const addItem = async (productId) => {
    const res = await api.post('/wishlist', { productId });
    setWishlist(res.data);
    return res.data;
  };

  const removeItem = async (productId) => {
    const res = await api.delete(`/wishlist/${productId}`);
    setWishlist(res.data);
    return res.data;
  };

  const moveToCart = async (productId) => {
    await api.post(`/wishlist/${productId}/move-to-cart`);
    setWishlist(prev => prev.filter(p => p.id !== productId));
  };

  return (
    <WishlistContext.Provider value={{ wishlist, loading, fetchWishlist, addItem, removeItem, moveToCart }}>
      {children}
    </WishlistContext.Provider>
  );
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error('useWishlist must be used within WishlistProvider');
  return ctx;
}
