// src/pages/admin/ManageProducts.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2, Edit, ArrowLeft, Coffee } from 'lucide-react';
import axios from 'axios';
import API_URL from '../../config';
import { useAuth } from '../../context/AuthContext';

export default function ManageProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get(`${API_URL}/products`);
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this gear? This cannot be undone.')) {
      try {
        const config = { headers: { Authorization: `Bearer ${user.token}` } };
        await axios.delete(`${API_URL}/products/${id}`, config);
        
        // Remove the deleted product from the screen without reloading
        setProducts(products.filter(product => product._id !== id));
      } catch (error) {
        console.error("Failed to delete product");
        alert("Error deleting product.");
      }
    }
  };

  if (!user || !user.isAdmin) return <div className="p-8 text-center text-red-500 font-bold">Access Denied.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <Link to="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-olive-accent hover:text-mocha-dark transition-colors mb-2 uppercase tracking-wider">
            <ArrowLeft className="w-3 h-3" /> Back to Dashboard
          </Link>
          <h1 className="text-3xl font-black">Manage Gear</h1>
        </div>
        <button className="inline-flex items-center gap-2 bg-olive-accent text-white font-bold px-4 py-2 rounded-xl hover:bg-mocha-light transition-colors shadow-sm">
          <Plus className="w-5 h-5" /> Add Product
        </button>
      </div>

      {/* Table Container */}
      <div className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-bg/50 dark:bg-mocha-dark/50 text-xs uppercase tracking-wider text-mocha-light dark:text-cream-bg/70">
              <tr>
                <th className="px-6 py-4 font-black">Item</th>
                <th className="px-6 py-4 font-black">Price</th>
                <th className="px-6 py-4 font-black">Stock</th>
                <th className="px-6 py-4 font-black text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive-accent/10">
              {loading ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center">Loading gear...</td></tr>
              ) : products.length === 0 ? (
                <tr><td colSpan="4" className="px-6 py-8 text-center">No products found.</td></tr>
              ) : (
                products.map((product) => (
                  <tr key={product._id} className="hover:bg-cream-bg/30 dark:hover:bg-mocha-dark/30 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 rounded-lg object-cover bg-mocha-base/10" />
                        <div>
                          <p className="font-bold text-base">{product.name}</p>
                          <p className="text-xs opacity-70 line-clamp-1 max-w-xs">{product.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-black text-olive-accent">₱{product.price}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex px-2.5 py-1 rounded-lg bg-mocha-dark text-cream-bg dark:bg-cream-bg dark:text-mocha-dark text-xs font-bold">
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button className="p-2 rounded-lg text-blue-500 hover:bg-blue-500/10 transition-colors" title="Edit">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(product._id)}
                          className="p-2 rounded-lg text-red-500 hover:bg-red-500/10 transition-colors" 
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}