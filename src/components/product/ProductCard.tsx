// src/components/product/ProductCard.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import { Product } from '../../types';
import { useCart } from '../../context/CartContext';
import { CartItem } from '../../types';
interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const item: CartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedColor: product.colors[0] || '',
    };

    addToCart(item);
  };

  return (
    <div className="product-card group animate-fadeIn">
      <Link to={`/products/${product.id}`} className="block">
        {/* Image */}
        <div className="relative overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Quick Add Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-0 left-0 right-0 bg-primary-900 text-white py-3 opacity-0 translate-y-full transition-all duration-300 flex items-center justify-center space-x-2 group-hover:opacity-90 group-hover:translate-y-0"
          >
            <ShoppingBag size={18} />
            <span>Add to Cart</span>
          </button>

          {/* Badges */}
          {product.isNew && (
            <span className="absolute top-4 right-4 bg-accent-500 text-white px-3 py-1 text-sm font-medium rounded-full">
              New
            </span>
          )}
          {!product.isNew && product.featured && (
            <span className="absolute top-4 right-4 bg-primary-700 text-white px-3 py-1 text-sm font-medium rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="text-sm text-gray-500 mb-1 capitalize">{product.category}</p>
          <h3 className="font-medium text-lg mb-2 text-primary-900 transition-colors group-hover:text-accent-500">
            {product.name}
          </h3>
          <p className="text-accent-700 font-semibold">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
