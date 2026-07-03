import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

function NavBar() {
  const { user, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const itemCount = cart?.items?.reduce((sum, i) => sum + i.quantity, 0) || 0;

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.brand}>ElectroShop</Link>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Products</Link>
        {user && (
          <>
            <Link to="/cart" style={styles.link}>Cart ({itemCount})</Link>
            <Link to="/wishlist" style={styles.link}>Wishlist</Link>
            <Link to="/orders" style={styles.link}>Orders</Link>
            {user.role === 'ADMIN' && <Link to="/admin" style={styles.link}>Admin</Link>}
            <span style={styles.user}>Hi, {user.displayName}</span>
            <button onClick={handleLogout} style={styles.btn}>Logout</button>
          </>
        )}
        {!user && (
          <>
            <Link to="/login" style={styles.link}>Login</Link>
            <Link to="/register" style={styles.link}>Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    background: '#1a1a2e', color: '#fff', padding: '12px 24px',
    display: 'flex', justifyContent: 'space-between', alignItems: 'center'
  },
  brand: { fontSize: '1.4rem', fontWeight: 'bold', color: '#e94560', textDecoration: 'none' },
  links: { display: 'flex', gap: '16px', alignItems: 'center' },
  link: { color: '#fff', textDecoration: 'none', fontSize: '0.95rem' },
  user: { color: '#ccc', fontSize: '0.9rem' },
  btn: {
    background: '#e94560', color: '#fff', border: 'none',
    padding: '6px 14px', borderRadius: '4px', cursor: 'pointer'
  }
};

export default NavBar;
