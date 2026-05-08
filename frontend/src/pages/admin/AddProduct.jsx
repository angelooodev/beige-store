// src/pages/admin/AddProduct.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import axios from 'axios';
import API_URL from '../../config';
import { ArrowLeft, Plus, Image as ImageIcon, Coffee, Package, Tag } from 'lucide-react';

export default function AddProduct() {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    imageUrl: ''
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` }
      };

      // Sending the coffee data to your Express API
      await axios.post(`${API_URL}/products`, formData, config);
      
      // Success! Head back to the list
      navigate('/admin/products');
      
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add product to catalog.');
      setLoading(false);
    }
  };

  if (!user || !user.isAdmin) return <div className="p-8 text-center text-red-500 font-bold">Access Denied.</div>;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <Link to="/admin/products" className="inline-flex items-center gap-2 text-xs font-bold text-olive-accent hover:text-mocha-dark transition-colors mb-6 uppercase tracking-wider">
        <ArrowLeft className="w-3 h-3" /> Back to Gear List
      </Link>
      
      <h1 className="text-3xl font-black mb-8">Stock New Gear</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100/50 border border-red-500/50 text-red-700 text-sm rounded-xl font-bold">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-8 rounded-3xl shadow-sm space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Product Name */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider">
              <Coffee className="w-3 h-3" /> Item Name
            </label>
            <input 
              type="text" name="name" required
              value={formData.name} onChange={handleChange}
              className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors"
              placeholder="e.g., Midnight Roast"
            />
          </div>

          {/* Image URL */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider">
              <ImageIcon className="w-3 h-3" /> Image URL
            </label>
            <input 
              type="url" name="imageUrl" required
              value={formData.imageUrl} onChange={handleChange}
              className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors"
              placeholder="https://images.unsplash.com/..."
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider">Description</label>
          <textarea 
            name="description" required rows="3"
            value={formData.description} onChange={handleChange}
            className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors resize-none"
            placeholder="Describe the flavor profile and roast intensity..."
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          {/* Price */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider">
              <Tag className="w-3 h-3" /> Price (₱)
            </label>
            <input 
              type="number" name="price" required min="0"
              value={formData.price} onChange={handleChange}
              className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors"
            />
          </div>

          {/* Stock */}
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider">
              <Package className="w-3 h-3" /> Initial Stock
            </label>
            <input 
              type="number" name="stock" required min="0"
              value={formData.stock} onChange={handleChange}
              className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4 border-t border-olive-accent/20">
          <button 
            type="submit" disabled={loading}
            className="flex items-center justify-center gap-2 bg-olive-accent text-white font-black py-4 px-8 rounded-2xl hover:bg-mocha-light transition-colors shadow-md disabled:opacity-50 w-full sm:w-auto"
          >
            {loading ? 'Adding to Pantry...' : 'Add to Catalog'}
            {!loading && <Plus className="w-5 h-5" />}
          </button>
        </div>
      </form>
    </div>
  );
}