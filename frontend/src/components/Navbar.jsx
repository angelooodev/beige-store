// src/components/Navbar.jsx
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Coffee, Moon, Sun, ShoppingCart, LogOut, LayoutDashboard } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext'; // <-- Import Auth
import CartDrawer from './CartDrawer';

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const { cartCount } = useCart();
  const { user, logout } = useAuth(); // <-- Pull user state
  const navigate = useNavigate();

  useEffect(() => {
    if (isDarkMode) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  }, [isDarkMode]);

  useEffect(() => {
    if (cartCount > 0) setIsCartOpen(true);
  }, [cartCount]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <>
      <nav className="sticky top-0 z-30 w-full border-b border-olive-accent/20 bg-cream-bg/90 backdrop-blur dark:bg-mocha-dark/90 dark:border-mocha-light/30">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-mocha-dark dark:text-cream-bg font-black text-xl tracking-tight hover:text-olive-accent transition-colors">
            <Coffee className="w-6 h-6 text-olive-accent" />
            <span>Forest<span className="text-olive-accent">Mocha</span></span>
          </Link>

          <div className="flex items-center gap-4">
            <button onClick={() => setIsDarkMode(!isDarkMode)} className="p-2 rounded-full hover:bg-olive-accent/10 transition-colors">
              {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2 rounded-full hover:bg-olive-accent/10 transition-colors">
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-olive-accent text-white text-[10px] font-bold flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Dynamic Auth Buttons */}
            {user ? (
              <div className="flex items-center gap-3">
                {user.isAdmin && (
                  <Link to="/admin" className="hidden sm:inline-flex items-center gap-1 px-3 py-1.5 rounded-lg border border-olive-accent/50 text-olive-accent text-xs font-bold hover:bg-olive-accent/10 transition-colors">
                    <LayoutDashboard className="w-4 h-4" />
                    Admin
                  </Link>
                )}
                <span className="hidden md:inline text-sm font-bold opacity-80">Hi, {user.fname}</span>
                <button onClick={handleLogout} className="p-2 rounded-full hover:bg-red-500/10 text-red-500 transition-colors" title="Logout">
                  <LogOut className="w-5 h-5" />
                </button>
              </div>
            ) : (
              <Link to="/login" className="hidden sm:inline-flex px-4 py-2 rounded-lg bg-olive-accent text-white text-sm font-semibold hover:bg-mocha-light transition-colors shadow-sm">
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}