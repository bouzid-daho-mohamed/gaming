// src/pages/ProductsPage.tsx
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ProductCard from '../components/product/ProductCard';
import ProductFilter from '../components/product/ProductFilter';

import { Category, Product } from '../types';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';

// 1) Type Supabase
type DBProduct = Database['public']['Tables']['products']['Row'];

// 2) Mapping DB → Front Product, respect admin ordering of images
const mapDbToProduct = (p: DBProduct): Product => {
  // Récupère le tableau d'images JSON ou fallback
  const rawImgs = (p as any).images;
  const imagesArray: string[] = Array.isArray(rawImgs) ? rawImgs : [];
  // Choisit la première image définie par l'admin ou la valeur par défaut
  const mainImage = imagesArray.length > 0 ? imagesArray[0] : p.image;

  return {
    id:          p.id,
    name:        p.name,
    description: p.description,
    price:       p.price,
    category:    p.category as Category,
    image:       mainImage,
    images:      imagesArray,
    colors:      p.colors ?? [],
    featured:    p.featured,
    isNew:       p.is_new,
  };
};

const ProductsPage: React.FC = () => {
  const { search } = useLocation();
  const categoryFromURL = (new URLSearchParams(search).get('category') as Category) || 'all';

  const [activeCategory, setActiveCategory] = useState<Category>(categoryFromURL);
  const [searchQuery,    setSearchQuery]    = useState('');
  const [products,       setProducts]       = useState<Product[]>([]);
  const [filtered,       setFiltered]       = useState<Product[]>([]);
  const [loading,        setLoading]        = useState(true);

  const categories: Category[] = ['all','playstation','xbox','nintendo','accessories'];

  // ─── Fetch initial products ────────────────────────────────────────
  useEffect(() => {
    (async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching products:', error.message);
        setProducts([]);
        setFiltered([]);
      } else {
        // on mappe en Product
        const mapped = (data ?? []).map(mapDbToProduct);
        setProducts(mapped);
        setFiltered(mapped);
      }
      setLoading(false);
    })();
  }, []);

  // ─── Filtrage dynamique ────────────────────────────────────────────
  useEffect(() => {
    let list = [...products];

    if (activeCategory !== 'all') {
      list = list.filter(p => p.category === activeCategory);
    }

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        p =>
          p.name.toLowerCase().includes(q) ||
          (p.description?.toLowerCase() ?? '').includes(q) ||
          p.category.toLowerCase().includes(q)
      );
    }

    setFiltered(list);
  }, [activeCategory, searchQuery, products]);

  // ─── Affichage loading ─────────────────────────────────────────────
  if (loading) {
    return (
      <div className="pt-24 pb-16">
        <div className="container text-center">Loading…</div>
      </div>
    );
  }

  // ─── Rendu principal ──────────────────────────────────────────────
  return (
    <div className="pt-24 pb-16">
      <div className="container">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary-900 mb-4">
            Our Collection
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our carefully curated selection of premium gaming products,
            designed for gamers who demand the best.
          </p>
        </div>

        {/* Filters */}
        <ProductFilter
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSearch={setSearchQuery}
        />

        {/* Product Grid */}
        {filtered.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium mb-2">No products found</h3>
            <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default ProductsPage;
