import { useState } from 'react';
import { useNavigate, Navigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import API_URL from '../config';
import { CreditCard, Truck, ShieldCheck, ArrowLeft } from 'lucide-react';

export default function Checkout() {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // 1. ADD THIS SUCCESS FLAG
  const [isSuccess, setIsSuccess] = useState(false); 

  if (!user) {
    return <Navigate to="/login" />;
  }

  // 2. UPDATE THIS LINE: Only kick them out if the cart is empty AND they didn't just checkout
  if (cart.length === 0 && !isSuccess) {
    return <Navigate to="/" />;
  }

  const handleCheckout = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const orderItems = cart.map(item => ({
      product: item._id,
      name: item.name,
      qty: item.qty,
      price: item.price
    }));

    try {
      const config = {
        headers: { Authorization: `Bearer ${user.token}` },
      };

      const orderData = {
        orderItems,
        shippingAddress: address,
        totalAmount: cartTotal,
        paymentMethod: 'GCash'
      };

      const { data } = await axios.post(`${API_URL}/orders`, orderData, config);

      // 3. SET THE FLAG TO TRUE BEFORE CLEARING THE CART
      setIsSuccess(true); 
      clearCart();
      navigate(`/thank-you/${data._id}`);
      
    } catch (err) {
      setError(err.response?.data?.message || 'Checkout failed. Please try again.');
      setLoading(false);
    }
  };


  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-mocha-light hover:text-olive-accent transition-colors mb-6">
        <ArrowLeft className="w-4 h-4" /> Back to Camp
      </Link>
      
      <h1 className="text-3xl font-black mb-8">Checkout Checkout</h1>

      {error && (
        <div className="mb-6 p-4 bg-red-100/50 border border-red-500/50 text-red-700 text-sm rounded-xl font-bold">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Left Side: Forms */}
        <div className="space-y-6">
          <div className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-black flex items-center gap-2 mb-4">
              <Truck className="w-5 h-5 text-olive-accent" />
              Shipping Destination
            </h2>
            <textarea 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address..."
              className="w-full bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-olive-accent transition-colors min-h-[100px]"
              required
            />
          </div>

          <div className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-6 rounded-2xl shadow-sm">
            <h2 className="text-lg font-black flex items-center gap-2 mb-4">
              <CreditCard className="w-5 h-5 text-olive-accent" />
              Payment Method
            </h2>
            <div className="p-4 border-2 border-olive-accent bg-olive-accent/10 rounded-xl flex items-center justify-between">
              <span className="font-bold">GCash (Demo)</span>
              <ShieldCheck className="w-5 h-5 text-olive-accent" />
            </div>
            <p className="text-xs text-mocha-light dark:text-cream-bg/60 mt-3 font-medium">
              This is a secure mock transaction. No real funds will be deducted.
            </p>
          </div>
        </div>

        {/* Right Side: Order Summary */}
        <div className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-6 rounded-2xl shadow-sm h-fit">
          <h2 className="text-lg font-black mb-4">Your Gear</h2>
          
          <div className="space-y-4 mb-6 max-h-[40vh] overflow-y-auto pr-2">
            {cart.map(item => (
              <div key={item._id} className="flex justify-between items-center text-sm">
                <div className="flex items-center gap-3">
                  <img src={item.imageUrl} alt={item.name} className="w-12 h-12 rounded-lg object-cover bg-mocha-base/10" />
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-mocha-light dark:text-cream-bg/70">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="font-black">₱{item.price * item.qty}</span>
              </div>
            ))}
          </div>

          <div className="border-t border-olive-accent/20 pt-4 mb-6">
            <div className="flex justify-between items-center text-xl font-black">
              <span>Total</span>
              <span className="text-olive-accent">₱{cartTotal}</span>
            </div>
          </div>

          <button 
            onClick={handleCheckout}
            disabled={loading || !address}
            className="w-full py-4 bg-olive-accent text-white font-black rounded-xl hover:bg-mocha-light transition-colors shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? 'Processing...' : 'Place Order via GCash'}
          </button>
        </div>

      </div>
    </div>
  );
}