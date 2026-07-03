import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

function WishlistPage() {
  const { wishlist, loading, removeItem, moveToCart } = useWishlist();
  const { addItem } = useCart();

  if (loading) return <div>Loading...</div>;
  if (wishlist.length === 0) {
    return <div style={styles.empty}><h2>Your wishlist is empty</h2><Link to="/">Browse Products</Link></div>;
  }

  const handleMoveToCart = async (productId) => {
    await moveToCart(productId);
  };

  return (
    <div>
      <h2>My Wishlist ({wishlist.length} items)</h2>
      <div style={styles.grid}>
        {wishlist.map(p => (
          <div key={p.id} style={styles.card}>
            <Link to={`/products/${p.id}`}>
              <div style={styles.imagePlaceholder}></div>
              <h4>{p.name}</h4>
              <p style={styles.price}>${p.price.toFixed(2)}</p>
            </Link>
            <div style={styles.actions}>
              <button onClick={() => handleMoveToCart(p.id)} style={styles.cartBtn}>Move to Cart</button>
              <button onClick={() => removeItem(p.id)} style={styles.removeBtn}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  empty: { textAlign: 'center', marginTop: '60px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '16px', marginTop: '16px' },
  card: { background: '#fff', padding: '16px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  imagePlaceholder: { height: '140px', background: '#eee', borderRadius: '4px', marginBottom: '8px' },
  price: { color: '#e94560', fontWeight: 'bold', marginTop: '4px' },
  actions: { display: 'flex', gap: '8px', marginTop: '12px' },
  cartBtn: { flex: 1, padding: '8px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '0.85rem' },
  removeBtn: { padding: '8px 12px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', fontSize: '0.85rem' }
};

export default WishlistPage;
