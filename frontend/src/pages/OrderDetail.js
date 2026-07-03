import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../utils/apiClient';

function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    api.get(`/orders/${id}`).then(res => setOrder(res.data)).catch(() => {});
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div>
      <Link to="/orders" style={styles.back}>← Back to Orders</Link>
      <div style={styles.header}>
        <h2>Order #{order.id}</h2>
        <span style={styles.status}>{order.status}</span>
      </div>
      <p style={styles.date}>{new Date(order.createdAt).toLocaleString()}</p>
      <p style={styles.address}><strong>Shipping to:</strong> {order.shippingAddress}</p>

      <div style={styles.items}>
        <h3>Items</h3>
        {order.items.map(item => (
          <div key={item.id} style={styles.row}>
            <span>{item.productName} x{item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div style={styles.total}><strong>Total: ${order.total.toFixed(2)}</strong></div>
    </div>
  );
}

const styles = {
  back: { color: '#888', textDecoration: 'none', fontSize: '0.9rem' },
  header: { display: 'flex', alignItems: 'center', gap: '16px', marginTop: '16px' },
  status: { color: '#f39c12', fontWeight: 'bold' },
  date: { color: '#888', marginTop: '8px' },
  address: { marginTop: '12px' },
  items: { background: '#fff', padding: '20px', borderRadius: '8px', marginTop: '20px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)' },
  row: { display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid #eee' },
  total: { textAlign: 'right', marginTop: '12px', fontSize: '1.2rem' }
};

export default OrderDetail;
