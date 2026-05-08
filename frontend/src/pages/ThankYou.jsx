import { Link, useParams } from 'react-router-dom';
import { CheckCircle, Package } from 'lucide-react';

export default function ThankYou() {
  const { orderId } = useParams();

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 text-center">
      <div className="w-20 h-20 bg-olive-accent/20 rounded-full flex items-center justify-center mb-6">
        <CheckCircle className="w-10 h-10 text-olive-accent" />
      </div>
      
      <h1 className="text-4xl font-black mb-2">Order Confirmed!</h1>
      <p className="text-mocha-base dark:text-cream-bg/80 mb-8 max-w-md">
        Your gear is being prepped. We've received your mock GCash payment and will begin processing immediately.
      </p>

      <div className="bg-white/60 dark:bg-mocha-base/50 backdrop-blur border border-olive-accent/20 px-6 py-4 rounded-xl shadow-sm mb-8 flex items-center gap-4">
        <Package className="w-5 h-5 text-olive-accent" />
        <div className="text-left">
          <p className="text-xs font-bold text-mocha-light dark:text-cream-bg/60 uppercase tracking-wider">Order ID</p>
          <p className="font-mono font-bold">{orderId}</p>
        </div>
      </div>

      <Link to="/" className="px-8 py-3 bg-mocha-dark dark:bg-cream-bg text-cream-bg dark:text-mocha-dark font-black rounded-xl hover:bg-olive-accent dark:hover:bg-olive-accent transition-colors shadow-md">
        Continue Exploring
      </Link>
    </div>
  );
}