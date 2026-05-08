import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import API_URL from '../config';


export default function Home() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart } = useCart();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // Fetching from your Express backend!
                const { data } = await axios.get('http://localhost:5000/api/products');
                setProducts(data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-black mb-4">Our Roasts</h1>
                <p className="text-mocha-base dark:text-cream-bg/80 max-w-2xl mx-auto">
                    Earthy, adventurous, and brewed for the trail.
                </p>
            </div>

            {loading ? (
                <div className="text-center py-10">Loading coffee...</div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {products.map((product) => (
                        <div key={product._id} className="border border-olive-accent/20 rounded-2xl overflow-hidden bg-white/50 dark:bg-mocha-base/50 p-4 shadow-sm hover:shadow-md transition-shadow">
                            <div className="relative h-56 w-full mb-4 rounded-xl overflow-hidden bg-mocha-base/10">
                                <img
                                    src={product.imageUrl}
                                    alt={product.name}
                                    className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <h2 className="text-lg font-bold mb-1">{product.name}</h2>
                            <p className="text-sm text-mocha-base dark:text-cream-bg/70 line-clamp-2 mb-3">{product.description}</p>
                            <div className="flex items-center justify-between">
                                <span className="font-black text-olive-accent text-lg">₱{product.price}</span>
                                <button
                                    onClick={() => addToCart(product)}
                                    className="px-3 py-1.5 bg-mocha-dark text-cream-bg dark:bg-cream-bg dark:text-mocha-dark text-sm font-bold rounded-lg hover:bg-olive-accent hover:text-white transition-colors"
                                >
                                    Add to Cart
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}