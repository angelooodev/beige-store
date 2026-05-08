// src/pages/admin/Dashboard.jsx
import { Package, Users, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Dashboard() {
  const { user } = useAuth();

  // We will wire these up to real backend endpoints later
  const stats = [
    { title: 'Total Products', value: '19', icon: Package, color: 'text-olive-accent', bg: 'bg-olive-accent/10' },
    { title: 'Registered Users', value: '4', icon: Users, color: 'text-blue-500', bg: 'bg-blue-500/10' },
    { title: 'Total Orders', value: '12', icon: ShoppingBag, color: 'text-amber-500', bg: 'bg-amber-500/10' },
  ];

  if (!user || !user.isAdmin) {
    return <div className="p-8 text-center text-red-500 font-bold">Access Denied. Admins only.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <p className="text-xs uppercase tracking-[0.25em] text-olive-accent font-bold mb-1">Admin Control Panel</p>
        <h1 className="text-3xl font-black">Dashboard overview</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-6 rounded-2xl shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-center mb-4">
              <span className="text-xs font-bold uppercase tracking-wider opacity-70">{stat.title}</span>
              <div className={`p-2 rounded-xl ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-5 h-5" />
              </div>
            </div>
            <p className="text-4xl font-black">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Quick Links */}
      <h2 className="text-lg font-black mb-4">Quick Management</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/products" className="group bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all flex items-center justify-between">
          <div>
            <h3 className="font-bold mb-1">Manage Products</h3>
            <p className="text-sm opacity-70">Add, edit, or delete catalog items.</p>
          </div>
          <ArrowRight className="w-5 h-5 text-olive-accent opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
        </Link>

        <Link to="/admin/orders" className="group bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 p-6 rounded-2xl shadow-sm hover:-translate-y-1 hover:shadow-md transition-all flex items-center justify-between">
          <div>
            <h3 className="font-bold mb-1">Manage Orders</h3>
            <p className="text-sm opacity-70">Process checkouts and update statuses.</p>
          </div>
          <ArrowRight className="w-5 h-5 text-olive-accent opacity-0 group-hover:opacity-100 transform -translate-x-4 group-hover:translate-x-0 transition-all" />
        </Link>
      </div>
    </div>
  );
}