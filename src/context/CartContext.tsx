// src/context/CartContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { CartItem } from '../types';

/** Génère une clé unique par id + couleur + taille */
export const getCartKey = (item: CartItem): string =>
  `${item.id}::${item.selectedColor ?? ''}::${item.selectedSize ?? ''}`;

interface CartContextType {
  cartItems: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // 1) Charger depuis localStorage au démarrage
  useEffect(() => {
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        setCartItems(JSON.parse(saved));
      } catch {}
    }
  }, []);

  // 2) Mettre à jour totaux + persister à chaque changement
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cartItems.reduce((sum, i) => sum + i.price * i.quantity, 0);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // 3) Ajout au panier (fusionne si même clé)
  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const key = getCartKey(newItem);
      const idx = prev.findIndex(i => getCartKey(i) === key);
      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].quantity += newItem.quantity;
        return copy;
      }
      return [...prev, newItem];
    });
  };

  // 4) Suppression
  const removeFromCart = (key: string) => {
    setCartItems(prev => prev.filter(i => getCartKey(i) !== key));
  };

  // 5) Mise à jour de quantité (supprime si <= 0)
  const updateQuantity = (key: string, quantity: number) => {
    setCartItems(prev =>
      prev
        .map(i => (getCartKey(i) === key ? { ...i, quantity } : i))
        .filter(i => i.quantity > 0)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        totalItems,
        totalPrice,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within a CartProvider');
  return ctx;
};
