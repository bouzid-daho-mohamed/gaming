import React from 'react';
import { Link } from 'react-router-dom';

const categories = [
  {
    name: "PlayStation Gear",
    description: "Official PlayStation branded apparel and accessories",
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products?category=playstation"
  },
  {
    name: "Xbox Collection",
    description: "Premium Xbox gaming wear and merchandise",
    image: "https://images.pexels.com/photos/4009598/pexels-photo-4009598.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products?category=xbox"
  },
  {
    name: "Gaming Accessories",
    description: "Must-have accessories for every gamer",
    image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    link: "/products?category=accessories"
  }
];

const CategorySection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-white mb-3">Gaming Collections</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Discover our exclusive gaming apparel and accessories designed for true gamers.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <Link 
              key={index} 
              to={category.link}
              className="group relative overflow-hidden rounded-lg shadow-lg h-96 block"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-transparent z-10 transition-opacity duration-300 opacity-80 group-hover:opacity-90"></div>
              <img 
                src={category.image} 
                alt={category.name} 
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 transform transition-transform duration-300 group-hover:translate-y-0 text-white">
                <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                <p className="mb-4 opacity-90">{category.description}</p>
                <div className="inline-block border-b-2 border-accent-400 font-medium pb-1 transition-colors duration-300 group-hover:border-white">
                  Shop Collection
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;