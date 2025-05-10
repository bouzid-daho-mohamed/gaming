import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import ProductCard from '../product/ProductCard';
import { supabase } from '../../lib/supabase';
import { Product } from '../../types';

const FeaturedProducts: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && data) {
        setProducts(data.map(product => ({
          id: product.id,
          name: product.name,
          description: product.description,
          price: product.price,
          category: product.category,
          image: product.image,
          images: product.images || [],
          colors: product.colors || [],
          featured: product.featured,
          isNew: product.is_new
        })));
      }
      setLoading(false);
    };

    fetchProducts();
  }, []);
  
  if (loading) {
    return (
      <section className="py-16 bg-gray-900">
        <div className="container">
          <div className="text-center text-white">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-900">
      <div className="container">
        <div className="flex flex-wrap items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Featured Gaming Gear</h2>
            <p className="text-gray-400 max-w-2xl">
              Level up your gaming experience with our premium selection of gaming accessories and merchandise.
            </p>
          </div>
          <Link 
            to="/products" 
            className="mt-4 md:mt-0 flex items-center text-accent-400 font-medium hover:text-accent-300 transition-colors"
          >
            View All Products
            <ChevronRight size={18} className="ml-1" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;