import React, { useState, useEffect } from 'react';
import api from '../utils/apiClient';

function AdminDashboard() {
  const [tab, setTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [orders, setOrders] = useState([]);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categoryName, setCategoryName] = useState('');
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchProducts = () => api.get('/products?size=100').then(r => setProducts(r.data.content)).catch(() => {});
  const fetchCategories = () => api.get('/categories').then(r => setCategories(r.data)).catch(() => {});
  const fetchOrders = () => api.get('/admin/orders').then(r => setOrders(r.data)).catch(() => {});

  useEffect(() => { fetchProducts(); fetchCategories(); }, []);
  useEffect(() => { if (tab === 'orders') fetchOrders(); }, [tab]);

  const handleCreateProduct = async (e) => {
    e.preventDefault();
    await api.post('/admin/products', { name, description, price: parseFloat(price), stock: parseInt(stock), categoryId: parseInt(categoryId) });
    setName(''); setDescription(''); setPrice(''); setStock(''); setCategoryId('');
    fetchProducts();
  };

  const handleUpdateProduct = async (e) => {
    e.preventDefault();
    await api.put(`/admin/products/${editingProduct.id}`, { name, description, price: parseFloat(price), stock: parseInt(stock), categoryId: parseInt(categoryId) });
    setEditingProduct(null); setName(''); setDescription(''); setPrice(''); setStock(''); setCategoryId('');
    fetchProducts();
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Delete this product?')) {
      await api.delete(`/admin/products/${id}`);
      fetchProducts();
    }
  };

  const handleCreateCategory = async (e) => {
    e.preventDefault();
    await api.post('/admin/categories', { name: categoryName });
    setCategoryName('');
    fetchCategories();
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm('Delete this category?')) {
      await api.delete(`/admin/categories/${id}`);
      fetchCategories();
    }
  };

  const handleUpdateStatus = async (orderId, status) => {
    await api.put(`/admin/orders/${orderId}/status`, { status });
    fetchOrders();
  };

  const startEdit = (p) => {
    setEditingProduct(p);
    setName(p.name); setDescription(p.description); setPrice(p.price.toString());
    setStock(p.stock.toString()); setCategoryId(p.categoryId?.toString() || '');
  };

  const renderProducts = () => (
    <div>
      <h3>{editingProduct ? 'Edit Product' : 'Add Product'}</h3>
      <form onSubmit={editingProduct ? handleUpdateProduct : handleCreateProduct} style={styles.form}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} style={styles.input} required />
        <input placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} style={styles.input} />
        <input placeholder="Price" type="number" step="0.01" value={price} onChange={e => setPrice(e.target.value)} style={styles.input} required />
        <input placeholder="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} style={styles.input} required />
        <select value={categoryId} onChange={e => setCategoryId(e.target.value)} style={styles.input} required>
          <option value="">Select Category</option>
          {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <div style={styles.formActions}>
          <button type="submit" style={styles.btn}>{editingProduct ? 'Update' : 'Create'}</button>
          {editingProduct && <button type="button" onClick={() => { setEditingProduct(null); setName(''); setDescription(''); setPrice(''); setStock(''); setCategoryId(''); }} style={styles.cancelBtn}>Cancel</button>}
        </div>
      </form>

      <h3 style={{ marginTop: '24px' }}>All Products ({products.length})</h3>
      <table style={styles.table}>
        <thead><tr><th>ID</th><th>Name</th><th>Price</th><th>Stock</th><th>Category</th><th>Actions</th></tr></thead>
        <tbody>
          {products.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td><td>{p.name}</td><td>${p.price.toFixed(2)}</td>
              <td>{p.stock}</td><td>{p.categoryName}</td>
              <td><button onClick={() => startEdit(p)} style={styles.editBtn}>Edit</button>
                <button onClick={() => handleDeleteProduct(p.id)} style={styles.delBtn}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderCategories = () => (
    <div>
      <h3>Add Category</h3>
      <form onSubmit={handleCreateCategory} style={styles.form}>
        <input placeholder="Category name" value={categoryName} onChange={e => setCategoryName(e.target.value)} style={styles.input} required />
        <button type="submit" style={styles.btn}>Create</button>
      </form>

      <h3 style={{ marginTop: '24px' }}>Categories</h3>
      <table style={styles.table}>
        <thead><tr><th>ID</th><th>Name</th><th>Actions</th></tr></thead>
        <tbody>
          {categories.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td><td>{c.name}</td>
              <td><button onClick={() => handleDeleteCategory(c.id)} style={styles.delBtn}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  const renderOrders = () => (
    <div>
      <h3>All Orders ({orders.length})</h3>
      <table style={styles.table}>
        <thead><tr><th>ID</th><th>User</th><th>Total</th><th>Status</th><th>Date</th><th>Actions</th></tr></thead>
        <tbody>
          {orders.map(o => (
            <tr key={o.id}>
              <td>#{o.id}</td>
              <td>{o.items?.[0]?.productName || '—'}</td>
              <td>${o.total.toFixed(2)}</td>
              <td>{o.status}</td>
              <td>{new Date(o.createdAt).toLocaleDateString()}</td>
              <td>
                <select defaultValue="" onChange={e => e.target.value && handleUpdateStatus(o.id, e.target.value)} style={styles.statusSelect}>
                  <option value="" disabled>Update Status</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="SHIPPED">SHIPPED</option>
                  <option value="DELIVERED">DELIVERED</option>
                  <option value="CANCELLED">CANCELLED</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div style={styles.tabs}>
        {['products', 'categories', 'orders'].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ ...styles.tab, ...(tab === t ? styles.activeTab : {}) }}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      <div style={{ marginTop: '20px' }}>
        {tab === 'products' && renderProducts()}
        {tab === 'categories' && renderCategories()}
        {tab === 'orders' && renderOrders()}
      </div>
    </div>
  );
}

const styles = {
  tabs: { display: 'flex', gap: '4px', marginTop: '16px' },
  tab: { padding: '10px 24px', border: 'none', background: '#eee', borderRadius: '4px 4px 0 0', cursor: 'pointer', fontSize: '0.95rem' },
  activeTab: { background: '#fff', fontWeight: 'bold', borderBottom: '2px solid #1a1a2e' },
  form: { display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px', alignItems: 'flex-end' },
  input: { padding: '8px', border: '1px solid #ddd', borderRadius: '4px', flex: '1', minWidth: '140px' },
  formActions: { display: 'flex', gap: '8px', width: '100%', marginTop: '4px' },
  btn: { padding: '8px 20px', background: '#1a1a2e', color: '#fff', border: 'none', borderRadius: '4px' },
  cancelBtn: { padding: '8px 20px', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px' },
  table: { width: '100%', borderCollapse: 'collapse', marginTop: '12px', background: '#fff', borderRadius: '8px', overflow: 'hidden' },
  editBtn: { background: '#3498db', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '3px', marginRight: '4px', fontSize: '0.85rem' },
  delBtn: { background: '#e94560', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '3px', fontSize: '0.85rem' },
  statusSelect: { padding: '4px', border: '1px solid #ddd', borderRadius: '3px', fontSize: '0.85rem' }
};

export default AdminDashboard;
