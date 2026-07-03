import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

function CartPage() {
  const { cart, loading, updateQuantity, removeItem } = useCart();
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (!cart || cart.items.length === 0) {
    return <div style={styles.empty}><h2>Your cart is empty</h2><Link to="/">Continue Shopping</Link></div>;
  }

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cart.items.map(item => (
        <div key={item.id} style={styles.item}>
          <div style={styles.info}>
            <h4>{item.productName}</h4>
            <p>${item.unitPrice.toFixed(2)} each</p>
          </div>
          <div style={styles.qty}>
            <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} style={styles.qtyBtn}>-</button>
            <span>{item.quantity}</span>
            <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} style={styles.qtyBtn}>+</button>
          </div>
          <p style={styles.subtotal}>${item.subtotal.toFixed(2)}</p>
          <button onClick={() => removeItem(item.productId)} style={styles.removeBtn}>✕</button>
        </div>
      ))}
      <div style={styles.footer}>
        <h3>Total: ${cart.total.toFixed(2)}</h3>
        <button onClick={() => navigate('/checkout')} style={styles.checkoutBtn}>Proceed to Checkout</button>
      </div>
    </div>
  );
}

const styles = {
  empty: { textAlign: 'center', marginTop: '60px' },
  item: { display: 'flex', alignItems: 'center', gap: '16px', background: '#fff', padding: '16px', borderRadius: '8px', marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  info: { flex: 1 },
  qty: { display: 'flex', alignItems: 'center', gap: '8px' },
  qtyBtn: { width: '32px', height: '32px', border: '1px solid #ddd', borderRadius: '4px', background: '#f5f5f5', fontSize: '1.1rem' },
  subtotal: { fontWeight: 'bold', minWidth: '80px', textAlign: 'right' },
  removeBtn: { background: 'none', border: 'none', color: '#e94560', fontSize: '1.2rem' },
  footer: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '24px' },
  checkoutBtn: { padding: '12px 32px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '1rem' }
};

export default CartPage;
