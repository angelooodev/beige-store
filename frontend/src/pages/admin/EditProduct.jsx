// src/pages/admin/EditProduct.jsx
import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import API_URL from '../../config';
import { ArrowLeft, Save, Image as ImageIcon } from 'lucide-react';

export default function EditProduct() {
  const { id } = useParams(); // Get the product ID from the URL
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({ name: '', description: '', price: '', stock: '', imageUrl: '' });
  const [loading, setLoading] = useState(true); // Starts true while we fetch
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  // Fetch the current product data when the page loads
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/products`);
        const product = data.find(p => p._id === id);
        
        if (product) {
          setFormData({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            imageUrl: product.imageUrl
          });
        }
      } catch (err) {
        setError('Failed to load product details.');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');

    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_URL}/products/${id}`, formData, config);
      navigate('/admin/products'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product.');
      setSaving(false);
    }
  };

  if (!user || !user.isAdmin) return <div className="p-8 text-center text-red-500 font-bold">Access Denied.</div>;
  if (loading) return <div className="p-8 text-center font-bold">Loading gear details...</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-xs font-bold text-olive-accent hover:text-mocha-dark transition-colors mb-6 uppercase tracking-wider">
        <ArrowLeft className="w-3 h-3" /> Back to Gear List
      </Link>
      
      <h1 className="text-3xl font-black mb-8">Edit Gear</h1>

      {error && <div className="mb-6 p-4 bg-red-100/50 border border-red-500/50 text-red-700 text-sm rounded-xl font-bold">{error}</div>}

      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-8 rounded-2xl shadow-sm space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider mb-2">Item Name</label>
            <input type="text" name="name" required value={formData.name} onChange={handleChange} className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider mb-2">Image URL</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <ImageIcon className="h-4 w-4 text-olive-accent" />
              </div>
              <input type="url" name="imageUrl" required value={formData.imageUrl} onChange={handleChange} className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl pl-10 pr-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors" />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider mb-2">Description</label>
          <textarea name="description" required rows="3" value={formData.description} onChange={handleChange} className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors" />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider mb-2">Price (₱)</label>
            <input type="number" name="price" required min="0" value={formData.price} onChange={handleChange} className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider mb-2">Stock Level</label>
            <input type="number" name="stock" required min="0" value={formData.stock} onChange={handleChange} className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors" />
          </div>
        </div>

        <div className="pt-4 border-t border-olive-accent/20">
          <button type="submit" disabled={saving} className="flex items-center justify-center gap-2 bg-blue-500 text-white font-black py-4 px-8 rounded-xl hover:bg-blue-600 transition-colors shadow-md disabled:opacity-50 w-full sm:w-auto">
            <Save className="w-5 h-5" />
            {saving ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}