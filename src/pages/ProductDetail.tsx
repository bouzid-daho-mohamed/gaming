// src/pages/ProductDetail.tsx
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, ShoppingBag, Heart, Share2, Check } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Database } from '../lib/database.types';
import { useCart } from '../context/CartContext';
import { Product, Category } from '../types';

type DBProduct = Database['public']['Tables']['products']['Row'];

const mapDbToProduct = (p: DBProduct): Product => {
  // Conversion sécurisée des images
  let images: string[] = [];
  if (Array.isArray(p.images)) {
    images = p.images;
  } else if (typeof p.images === 'string') {
    try {
      images = JSON.parse(p.images);
    } catch (e) {
      console.error('Error parsing images:', e);
    }
  }

  return {
    id: p.id,
    name: p.name || '',
    description: p.description || '',
    price: p.price || 0,
    category: (p.category as Category) || 'other',
    image: p.image || '/placeholder.jpg',
    images: images,
    colors: Array.isArray(p.colors) ? p.colors : [],
    featured: p.featured || false,
    new: p.is_new || false,
  };
};

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setColor] = useState('');
  const [selectedImage, setImage] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchProductData = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data: productData, error: productError } = await supabase
          .from('products')
          .select('*')
          .eq('id', id)
          .single();

        if (productError || !productData) {
          throw productError || new Error('Produit non trouvé');
        }

        const formattedProduct = mapDbToProduct(productData);
        setProduct(formattedProduct);

        // Initialisation sécurisée
        const initialColor = formattedProduct.colors[0] || '';
        const initialImage = 
          formattedProduct.images?.[0] || 
          formattedProduct.image || 
          '/placeholder.jpg';
        
        setColor(initialColor);
        setImage(initialImage);

        // Récupération des produits similaires
        const { data: relatedData, error: relatedError } = await supabase
          .from('products')
          .select('*')
          .eq('category', formattedProduct.category)
          .neq('id', id)
          .limit(4);

        setRelated(
          relatedData?.map(mapDbToProduct) || []
        );

      } catch (err: any) {
        setError(err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
        window.scrollTo(0, 0);
      }
    };

    fetchProductData();
  }, [id]);

  const handleColorSelect = (color: string) => {
    if (!product) return;
    
    const colorIndex = product.colors.indexOf(color);
    const newImage = product.images?.[colorIndex] || product.image;
    
    setColor(color);
    setImage(newImage);
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addToCart({
      ...product,
      quantity,
      selectedColor,
      image: selectedImage,
    });
  };

  if (loading) {
    return <div className="container pt-32 pb-16 text-center">Chargement...</div>;
  }

  if (error || !product) {
    return (
      <div className="container pt-32 pb-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Produit introuvable</h2>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        <Link to="/products" className="btn btn-primary">
          Retour aux produits
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16">
      <div className="container">
        <Link 
          to="/products" 
          className="inline-flex items-center text-primary-700 hover:text-primary-900 mb-8"
        >
          <ChevronLeft size={16} className="mr-1" /> 
          Retour aux produits
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-16">
          {/* Galerie */}
          <div className="space-y-4">
            <div className="bg-white rounded-lg overflow-hidden shadow-md aspect-square">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder.jpg';
                }}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {(product.images || []).map((img, index) => (
                <button
                  key={index}
                  onClick={() => setImage(img)}
                  className={`shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === img 
                      ? 'border-primary-500' 
                      : 'border-gray-200'
                  }`}
                >
                  <img
                    src={img}
                    alt={`Variante ${index + 1}`}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = '/placeholder.jpg';
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Détails */}
          <div>
            <div className="mb-6">
              <span className="text-sm text-gray-500 uppercase tracking-wide">
                {product.category}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-3">
                {product.name}
              </h1>
              <p className="text-2xl font-semibold text-accent-700 mb-6">
                €{product.price.toFixed(2)}
              </p>
              <p className="text-gray-600 mb-6">{product.description}</p>
            </div>

            {product.colors.length > 0 && (
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-3">
                  Couleur
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => handleColorSelect(color)}
                      className={`px-4 py-2 rounded-full border ${
                        selectedColor === color
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mb-8">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Quantité
              </h3>
              <div className="flex items-center w-fit border rounded-lg">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  -
                </button>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                  className="w-16 text-center border-x"
                />
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 py-2 hover:bg-gray-100"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 min-w-[200px] btn btn-primary flex items-center justify-center gap-2"
              >
                <ShoppingBag size={20} />
                Ajouter au panier
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-100">
                <Heart size={20} />
              </button>
              <button className="p-3 border rounded-lg hover:bg-gray-100">
                <Share2 size={20} />
              </button>
            </div>
          </div>
        </div>

        {related.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Produits similaires</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((product) => (
                <Link
                  key={product.id}
                  to={`/products/${product.id}`}
                  className="group block overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="aspect-square bg-gray-100">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900">{product.name}</h3>
                    <p className="text-accent-700 font-semibold mt-1">
                      €{product.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}