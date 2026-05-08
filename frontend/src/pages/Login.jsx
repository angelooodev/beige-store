import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Coffee, LogIn } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import API_URL from '../config';

export default function Login() {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');

  try {
    const { data } = await axios.post(`${API_URL}/auth/login`, formData);
    
    login(data);
    navigate('/');
  } catch (err) {
    setError(err.response?.data?.message || 'Invalid email or password.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/80 dark:bg-mocha-base/80 backdrop-blur-md border border-olive-accent/20 rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-olive-accent/20 text-olive-accent mb-4">
            <Coffee className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-mocha-dark dark:text-cream-bg">Welcome Back</h1>
          <p className="text-sm text-mocha-light dark:text-cream-bg/70 mt-2">Log in to track your orders.</p>
        </div>

        {error && (
          <div className="mb-6 p-3 bg-red-100/50 border border-red-500/50 text-red-700 text-sm rounded-lg text-center font-bold">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider mb-1">Email</label>
            <input 
              type="email" name="email" required
              className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-olive-accent transition-colors"
              onChange={handleChange}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-mocha-light dark:text-cream-bg/80 uppercase tracking-wider mb-1">Password</label>
            <input 
              type="password" name="password" required
              className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-olive-accent transition-colors"
              onChange={handleChange}
            />
          </div>

          <button 
            type="submit" disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-olive-accent text-white font-black py-3 rounded-xl hover:bg-mocha-light transition-colors shadow-md mt-6"
          >
            {loading ? 'Authenticating...' : 'Login'}
            {!loading && <LogIn className="w-4 h-4" />}
          </button>
        </form>

        <p className="text-center text-sm text-mocha-light dark:text-cream-bg/70 mt-6 font-medium">
          Don't have an account? <Link to="/register" className="text-mocha-dark dark:text-cream-bg font-black hover:underline">Sign up</Link>
        </p>
      </div>
    </div>
  );
}