// src/types/index.ts

/**
 * Catégories disponibles pour filtrage
 */
export type Category =
  | 'all'
  | 'playstation'
  | 'xbox'
  | 'nintendo'
  | 'retro'
  | 'accessories';

/**
 * Modèle unique pour toutes les entités “produit” du front-end.
 * - `id` : UUID (string) si le produit vient de Supabase, ou number pour les mocks.
 * - `isNew` : alias de la colonne `is_new` côté Supabase.
 * - `images` : URLs secondaires d’images selon la couleur (toujours présentes).
 */
export interface Product {
  /** Identifiant (UUID ou number mock) */
  id: string | number;
  /** Nom du produit */
  name: string;
  /** Description, peut être null */
  description: string | null;
  /** Prix du produit */
  price: number;
  /** Catégorie pour filtrage */
  category: Category;
  /** URL principale de l’image */
  image: string;
  /** URLs secondaires d’images selon couleur */
  images: string[];
  /** Couleurs disponibles */
  colors: string[];
  /** Produit mis en avant */
  featured: boolean;
  /** Nouveauté */
  isNew: boolean;
}

/**
 * Élément minimal stocké dans le panier
 * - Pas d’héritage de Product pour alléger le type
 * - Garde uniquement les champs nécessaires au panier
 */
export interface CartItem {
  /** Identifiant du produit (UUID ou number mock) */
  id: string | number;
  /** Nom du produit */
  name: string;
  /** Prix unitaire */
  price: number;
  /** URL de l’image principale */
  image: string;
  /** Quantité d’articles dans le panier */
  quantity: number;
  /** Couleur choisie (facultatif) */
  selectedColor?: string;
}
