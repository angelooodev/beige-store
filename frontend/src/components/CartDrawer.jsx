// src/components/CartDrawer.jsx
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export default function CartDrawer({ isOpen, onClose }) {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  return (
    <>
      {/* Dark Overlay */}
      <div 
        className={`fixed inset-0 bg-mocha-dark/50 backdrop-blur-sm z-40 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* Sliding Drawer */}
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[400px] bg-cream-bg dark:bg-mocha-dark z-50 shadow-2xl transform transition-transform duration-300 ease-in-out flex flex-col border-l border-olive-accent/20 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-olive-accent/20">
          <h2 className="text-lg font-black flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-olive-accent" />
            Your Gear
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-olive-accent/10 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-mocha-light dark:text-cream-bg/50 space-y-2">
              <ShoppingBag className="w-12 h-12 mb-2 opacity-50" />
              <p>Your pack is empty.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item._id} className="flex gap-4 bg-white/50 dark:bg-mocha-base/50 p-3 rounded-xl border border-olive-accent/10">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-lg bg-mocha-base/10" />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-sm line-clamp-1">{item.name}</h3>
                    <p className="text-olive-accent font-black text-sm">₱{item.price}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center bg-cream-bg dark:bg-mocha-dark rounded-lg border border-olive-accent/20 overflow-hidden">
                      <button onClick={() => updateQuantity(item._id, item.qty - 1)} className="px-2 py-1 hover:bg-olive-accent/20 transition-colors"><Minus className="w-3 h-3" /></button>
                      <span className="px-2 text-xs font-bold">{item.qty}</span>
                      <button onClick={() => updateQuantity(item._id, item.qty + 1)} className="px-2 py-1 hover:bg-olive-accent/20 transition-colors"><Plus className="w-3 h-3" /></button>
                    </div>
                    <button onClick={() => removeFromCart(item._id)} className="text-xs text-red-500 hover:text-red-700 font-bold uppercase tracking-wider">Remove</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer / Checkout */}
        {cart.length > 0 && (
          <div className="p-4 border-t border-olive-accent/20 bg-white/30 dark:bg-mocha-base/30">
            <div className="flex justify-between items-center mb-4 font-black text-lg">
              <span>Total</span>
              <span>₱{cartTotal}</span>
            </div>
            <Link to="/checkout" onClick={onClose} className="w-full py-3 bg-olive-accent text-white font-bold rounded-xl flex justify-center hover:bg-mocha-light transition-colors shadow-md">
              Proceed to Checkout
            </Link>
          </div>
        )}
      </div>
    </>
  );
}