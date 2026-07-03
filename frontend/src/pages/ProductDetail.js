import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/apiClient';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { user } = useAuth();
  const { addItem } = useCart();
  const { wishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();
  const [added, setAdded] = useState(false);

  useEffect(() => {
    api.get(`/products/${id}`).then(res => setProduct(res.data)).catch(() => {});
  }, [id]);

  if (!product) return <div>Loading...</div>;

  const inWishlist = wishlist.some(p => p.id === product.id);

  const handleAddToCart = async () => {
    await addItem(product.id);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div style={styles.container}>
      <div style={styles.imagePlaceholder}></div>
      <div style={styles.info}>
        <h1>{product.name}</h1>
        <p style={styles.category}>{product.categoryName}</p>
        <p style={styles.price}>${product.price.toFixed(2)}</p>
        <p style={styles.stock}>{product.stock > 0 ? `In Stock (${product.stock} available)` : 'Out of Stock'}</p>
        <p style={styles.desc}>{product.description}</p>
        {user && (
          <div style={styles.actions}>
            <button onClick={handleAddToCart} disabled={product.stock === 0} style={styles.addBtn}>
              {added ? '✓ Added!' : 'Add to Cart'}
            </button>
            <button onClick={() => inWishlist ? removeWishlist(product.id) : addWishlist(product.id)} style={styles.wishBtn}>
              {inWishlist ? '❤️ Remove from Wishlist' : '♡ Add to Wishlist'}
            </button>
          </div>
        )}
        {!user && <p style={styles.loginPrompt}><Link to="/login">Login</Link> to add items to cart</p>}
      </div>
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '40px', marginTop: '24px' },
  imagePlaceholder: { width: '400px', height: '400px', background: '#eee', borderRadius: '8px', flexShrink: 0 },
  info: { flex: 1 },
  category: { color: '#888', fontSize: '0.9rem', marginTop: '4px' },
  price: { fontSize: '2rem', fontWeight: 'bold', color: '#e94560', margin: '16px 0' },
  stock: { color: '#2ecc71', fontSize: '0.95rem' },
  desc: { color: '#555', lineHeight: 1.6, marginTop: '16px' },
  actions: { display: 'flex', gap: '12px', marginTop: '24px' },
  addBtn: { padding: '12px 32px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem' },
  wishBtn: { padding: '12px 24px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px' },
  loginPrompt: { marginTop: '16px', color: '#888' }
};

export default ProductDetail;
