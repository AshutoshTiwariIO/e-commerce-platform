import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/apiClient';

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/orders').then(res => {
      setOrders(res.data.content);
    }).catch(() => {}).finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading...</div>;
  if (orders.length === 0) return <div style={styles.empty}><h2>No orders yet</h2><Link to="/">Start Shopping</Link></div>;

  return (
    <div>
      <h2>My Orders</h2>
      {orders.map(order => (
        <Link to={`/orders/${order.id}`} key={order.id} style={styles.card}>
          <div>
            <strong>Order #{order.id}</strong>
            <p style={styles.date}>{new Date(order.createdAt).toLocaleDateString()}</p>
          </div>
          <div style={styles.center}>
            <span style={{
              ...styles.status,
              color: order.status === 'CONFIRMED' ? '#f39c12' : order.status === 'SHIPPED' ? '#3498db' : '#2ecc71'
            }}>
              {order.status}
            </span>
          </div>
          <div style={styles.right}>
            <strong>${order.total.toFixed(2)}</strong>
            <p style={styles.count}>{order.items.length} items</p>
          </div>
        </Link>
      ))}
    </div>
  );
}

const styles = {
  empty: { textAlign: 'center', marginTop: '60px' },
  card: {
    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
    background: '#fff', padding: '16px 24px', borderRadius: '8px',
    marginBottom: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.08)', textDecoration: 'none', color: 'inherit'
  },
  date: { color: '#888', fontSize: '0.85rem', marginTop: '4px' },
  center: { textAlign: 'center' },
  right: { textAlign: 'right' },
  status: { fontWeight: 'bold', fontSize: '0.9rem' },
  count: { color: '#888', fontSize: '0.85rem', marginTop: '4px' }
};

export default OrderHistory;
