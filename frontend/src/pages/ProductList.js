import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/apiClient';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const { user } = useAuth();
  const { addItem } = useCart();
  const { wishlist, addItem: addWishlist, removeItem: removeWishlist } = useWishlist();

  useEffect(() => {
    api.get('/categories').then(res => setCategories(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    const params = { page, size: 12 };
    if (categoryId) params.categoryId = categoryId;
    if (search) params.search = search;
    api.get('/products', { params }).then(res => {
      setProducts(res.data.content);
      setTotalPages(res.data.totalPages);
    }).catch(() => {});
  }, [page, categoryId, search]);

  const isInWishlist = (productId) => wishlist.some(p => p.id === productId);

  return (
    <div>
      <div style={styles.filters}>
        <input placeholder="Search products..." value={search}
          onChange={e => { setSearch(e.target.value); setPage(0); }} style={styles.searchInput} />
        <select value={categoryId} onChange={e => { setCategoryId(e.target.value); setPage(0); }} style={styles.select}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
      </div>

      <div style={styles.grid}>
        {products.map(p => (
          <div key={p.id} style={styles.card}>
            <Link to={`/products/${p.id}`}>
              <div style={styles.imagePlaceholder}></div>
              <h3 style={styles.name}>{p.name}</h3>
              <p style={styles.category}>{p.categoryName}</p>
              <p style={styles.price}>${p.price.toFixed(2)}</p>
            </Link>
            {user && (
              <div style={styles.actions}>
                <button onClick={() => addItem(p.id)} style={styles.addBtn}>Add to Cart</button>
                <button onClick={() => isInWishlist(p.id) ? removeWishlist(p.id) : addWishlist(p.id)} style={styles.wishBtn}>
                  {isInWishlist(p.id) ? '❤️' : '♡'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {totalPages > 1 && (
        <div style={styles.pagination}>
          <button disabled={page === 0} onClick={() => setPage(p => p - 1)} style={styles.pageBtn}>Prev</button>
          <span>Page {page + 1} of {totalPages}</span>
          <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)} style={styles.pageBtn}>Next</button>
        </div>
      )}
    </div>
  );
}

const styles = {
  filters: { display: 'flex', gap: '12px', marginBottom: '24px' },
  searchInput: { flex: 1, padding: '10px', border: '1px solid #ddd', borderRadius: '4px' },
  select: { padding: '10px', border: '1px solid #ddd', borderRadius: '4px', minWidth: '160px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' },
  card: { background: '#fff', borderRadius: '8px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.08)' },
  imagePlaceholder: { height: '160px', background: '#eee', borderRadius: '4px', marginBottom: '12px' },
  name: { fontSize: '1rem', marginBottom: '4px' },
  category: { fontSize: '0.8rem', color: '#888' },
  price: { fontSize: '1.2rem', fontWeight: 'bold', color: '#e94560', marginTop: '8px' },
  actions: { display: 'flex', gap: '8px', marginTop: '12px' },
  addBtn: { flex: 1, padding: '8px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px' },
  wishBtn: { padding: '8px 12px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', fontSize: '1.1rem' },
  pagination: { display: 'flex', justifyContent: 'center', gap: '16px', marginTop: '24px', alignItems: 'center' },
  pageBtn: { padding: '8px 16px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }
};

export default ProductList;
