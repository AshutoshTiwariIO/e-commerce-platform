import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import api from '../utils/apiClient';

function CheckoutPage() {
  const { cart, loading, clearCart } = useCart();
  const [address, setAddress] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (order) return (
    <div style={styles.confirmation}>
      <h2>Order Confirmed! 🎉</h2>
      <p>Order ID: #{order.id}</p>
      <p>Status: {order.status}</p>
      <p>Total: ${order.total.toFixed(2)}</p>
      <p>Shipping to: {order.shippingAddress}</p>
      <button onClick={() => navigate('/orders')} style={styles.btn}>View My Orders</button>
    </div>
  );

  if (!cart || cart.items.length === 0) {
    return <div style={styles.confirmation}><h2>Your cart is empty</h2></div>;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!address.trim()) return;
    setSubmitting(true);
    setError('');
    try {
      const res = await api.post('/orders', { shippingAddress: address });
      setOrder(res.data);
      clearCart();
    } catch (err) {
      setError(err.response?.data?.error || 'Checkout failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.summary}>
        <h2>Order Summary</h2>
        {cart.items.map(item => (
          <div key={item.id} style={styles.row}>
            <span>{item.productName} x{item.quantity}</span>
            <span>${item.subtotal.toFixed(2)}</span>
          </div>
        ))}
        <div style={styles.total}><strong>Total: ${cart.total.toFixed(2)}</strong></div>
      </div>

      <form onSubmit={handleSubmit} style={styles.form}>
        <h2>Shipping Details</h2>
        {error && <p style={styles.error}>{error}</p>}
        <textarea placeholder="Enter your shipping address" value={address}
          onChange={e => setAddress(e.target.value)} rows={4} style={styles.textarea} required />
        <button type="submit" disabled={submitting} style={styles.btn}>
          {submitting ? 'Processing...' : `Pay $${cart.total.toFixed(2)}`}
        </button>
        <p style={styles.note}>This is a mock payment — no real charges will be made.</p>
      </form>
    </div>
  );
}

const styles = {
  container: { display: 'flex', gap: '40px', marginTop: '24px' },
  summary: { flex: 1, background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  form: { flex: 1, background: '#fff', padding: '24px', borderRadius: '8px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #eee' },
  total: { textAlign: 'right', marginTop: '12px', fontSize: '1.1rem' },
  textarea: { width: '100%', padding: '10px', border: '1px solid #ddd', borderRadius: '4px', marginTop: '12px', boxSizing: 'border-box' },
  btn: { width: '100%', padding: '12px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', marginTop: '16px', fontSize: '1rem' },
  error: { color: '#e94560', fontSize: '0.9rem' },
  note: { textAlign: 'center', color: '#888', fontSize: '0.85rem', marginTop: '8px' },
  confirmation: { textAlign: 'center', marginTop: '60px', lineHeight: 2 }
};

export default CheckoutPage;
