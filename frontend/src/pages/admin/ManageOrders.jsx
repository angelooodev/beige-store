import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Package, CheckCircle, Clock, Truck } from 'lucide-react';
import axios from 'axios';
import API_URL from '../../config';
import { useAuth } from '../../context/AuthContext';

export default function ManageOrders() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      const { data } = await axios.get(`${API_URL}/orders`, config);
      setOrders(data);
    } catch (error) {
      console.error("Failed to load orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const config = { headers: { Authorization: `Bearer ${user.token}` } };
      await axios.put(`${API_URL}/orders/${id}/status`, { status: newStatus }, config);
      
      // Update the local state instantly
      setOrders(orders.map(order => 
        order._id === id ? { ...order, status: newStatus } : order
      ));
    } catch (error) {
      alert("Failed to update status.");
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'Pending': return <Clock className="w-4 h-4 text-amber-500" />;
      case 'Processing': return <Package className="w-4 h-4 text-blue-500" />;
      case 'Shipped': return <Truck className="w-4 h-4 text-purple-500" />;
      case 'Delivered': return <CheckCircle className="w-4 h-4 text-green-500" />;
      default: return null;
    }
  };

  if (!user || !user.isAdmin) return <div className="p-8 text-center text-red-500 font-bold">Access Denied.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link to="/admin" className="inline-flex items-center gap-2 text-xs font-bold text-olive-accent hover:text-mocha-dark transition-colors mb-2 uppercase tracking-wider">
          <ArrowLeft className="w-3 h-3" /> Back to Dashboard
        </Link>
        <h1 className="text-3xl font-black">Manage Orders</h1>
      </div>

      <div className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 rounded-2xl shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream-bg/50 dark:bg-mocha-dark/50 text-xs uppercase tracking-wider text-mocha-light dark:text-cream-bg/70">
              <tr>
                <th className="px-6 py-4 font-black">Order ID</th>
                <th className="px-6 py-4 font-black">Customer</th>
                <th className="px-6 py-4 font-black">Total</th>
                <th className="px-6 py-4 font-black">Status</th>
                <th className="px-6 py-4 font-black text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-olive-accent/10">
              {loading ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center">Loading orders...</td></tr>
              ) : orders.length === 0 ? (
                <tr><td colSpan="5" className="px-6 py-8 text-center">No orders found. Time to market!</td></tr>
              ) : (
                orders.map((order) => (
                  <tr key={order._id} className="hover:bg-cream-bg/30 dark:hover:bg-mocha-dark/30 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs opacity-70">{order._id}</td>
                    <td className="px-6 py-4">
                      <p className="font-bold">{order.user?.fname} {order.user?.lname}</p>
                      <p className="text-xs opacity-70">{order.user?.email}</p>
                    </td>
                    <td className="px-6 py-4 font-black text-olive-accent">₱{order.totalAmount}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 font-bold text-xs bg-cream-bg dark:bg-mocha-dark px-3 py-1.5 rounded-lg w-fit">
                        {getStatusIcon(order.status || 'Pending')}
                        {order.status || 'Pending'}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        value={order.status || 'Pending'}
                        onChange={(e) => handleStatusUpdate(order._id, e.target.value)}
                        className="bg-cream-bg dark:bg-mocha-dark border border-olive-accent/30 rounded-lg px-3 py-1.5 text-xs font-bold focus:outline-none focus:border-olive-accent"
                      >
                        <option value="Pending">Pending</option>
                        <option value="Processing">Processing</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                      </select>
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