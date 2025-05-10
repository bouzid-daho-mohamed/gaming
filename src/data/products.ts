import { Product } from '../types';

export const products: Product[] = [
  {
    id: 1,
    name: "PlayStation Logo Hoodie",
    description: "Premium cotton blend hoodie featuring the iconic PlayStation logo. Perfect for gaming sessions and casual wear. Features a comfortable hood, kangaroo pocket, and ribbed cuffs.",
    price: 59.99,
    category: "playstation",
    image: "https://images.pexels.com/photos/5082579/pexels-photo-5082579.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true,
    new: false,
    colors: ["Black", "Navy", "Gray"],
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: 2,
    name: "Xbox Controller T-Shirt",
    description: "Comfortable cotton t-shirt with a stylized Xbox controller design. Perfect for showing your gaming passion with style.",
    price: 29.99,
    category: "xbox",
    image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true,
    new: true,
    colors: ["White", "Black", "Green"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 3,
    name: "Gaming Snapback Cap",
    description: "Adjustable snapback cap with embroidered gaming icons. Perfect for completing your gaming outfit.",
    price: 24.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/1124465/pexels-photo-1124465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: false,
    new: true,
    colors: ["Black", "White", "Red"],
    sizes: ["One Size"]
  },
  {
    id: 4,
    name: "Retro Gaming Jacket",
    description: "Vintage-style bomber jacket featuring classic gaming console designs. Made from durable materials with a comfortable fit.",
    price: 89.99,
    category: "retro",
    image: "https://images.pexels.com/photos/1183266/pexels-photo-1183266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true,
    new: false,
    colors: ["Black", "Navy"],
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: 5,
    name: "Gaming Performance Socks",
    description: "Comfortable gaming socks with moisture-wicking technology. Perfect for long gaming sessions.",
    price: 14.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/6802983/pexels-photo-6802983.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: false,
    new: true,
    colors: ["Black", "White", "Gray"],
    sizes: ["S", "M", "L"]
  },
  {
    id: 6,
    name: "Nintendo Classic Sweater",
    description: "Cozy sweater featuring retro Nintendo game characters. Made from soft cotton blend material.",
    price: 49.99,
    category: "nintendo",
    image: "https://images.pexels.com/photos/4009626/pexels-photo-4009626.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true,
    new: false,
    colors: ["Red", "Gray", "Black"],
    sizes: ["XS", "S", "M", "L", "XL"]
  },
  {
    id: 7,
    name: "Pro Gamer Backpack",
    description: "Spacious backpack designed for gamers. Features padded laptop compartment and multiple organizer pockets.",
    price: 79.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/2905238/pexels-photo-2905238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: true,
    new: false,
    colors: ["Black", "Gray"],
    sizes: ["One Size"]
  },
  {
    id: 8,
    name: "Gaming Icons Beanie",
    description: "Warm and stylish beanie with embroidered gaming icons. Perfect for winter gaming sessions.",
    price: 19.99,
    category: "accessories",
    image: "https://images.pexels.com/photos/6802042/pexels-photo-6802042.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    featured: false,
    new: true,
    colors: ["Black", "Gray", "Navy"],
    sizes: ["One Size"]
  }
];

export const getProductById = (id: number): Product | undefined => {
  return products.find(product => product.id === id);
};

export const getFeaturedProducts = (): Product[] => {
  return products.filter(product => product.featured);
};

export const getNewProducts = (): Product[] => {
  return products.filter(product => product.new);
};

export const getProductsByCategory = (category: string): Product[] => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};