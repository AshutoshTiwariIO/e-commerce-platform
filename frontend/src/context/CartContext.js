import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '../utils/apiClient';
import { useAuth } from './AuthContext';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const { user } = useAuth();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCart = useCallback(async () => {
    if (!user) { setCart(null); return; }
    try {
      setLoading(true);
      const res = await api.get('/cart');
      setCart(res.data);
    } catch { setCart(null); } finally { setLoading(false); }
  }, [user]);

  useEffect(() => { fetchCart(); }, [fetchCart]);

  const addItem = async (productId, quantity = 1) => {
    const res = await api.post('/cart', { productId, quantity });
    setCart(res.data);
    return res.data;
  };

  const updateQuantity = async (productId, quantity) => {
    const res = await api.put('/cart', { productId, quantity });
    setCart(res.data);
    return res.data;
  };

  const removeItem = async (productId) => {
    const res = await api.delete(`/cart/${productId}`);
    setCart(res.data);
    return res.data;
  };

  const clearCart = async () => {
    await api.delete('/cart');
    setCart(null);
  };

  return (
    <CartContext.Provider value={{ cart, loading, fetchCart, addItem, updateQuantity, removeItem, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
