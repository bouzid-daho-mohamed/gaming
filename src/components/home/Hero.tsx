import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/70 z-10"></div>
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Gaming setup" 
          className="w-full h-full object-cover"
        />
      </div>
      
      <div className="container relative z-20 py-24 md:py-32 lg:py-40 text-white">
        <div className="max-w-2xl animate-fadeIn">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Level Up Your Gaming Style
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
            Premium gaming apparel and accessories for PlayStation, Xbox, and more. Designed for gamers, by gamers.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link to="/products" className="btn btn-accent flex items-center">
              Shop Collection
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to="/about" className="btn btn-outline border-white text-white hover:bg-white/10">
              About Us
            </Link>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;