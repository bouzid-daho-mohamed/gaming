import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag } from 'lucide-react';
import { useTranslation } from 'react-i18next';

const Hero: React.FC = () => {
  const { t } = useTranslation();
  
  return (
    <section className="relative min-h-screen pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 to-gray-800/70 z-10"></div>
      <div className="absolute inset-0">
        <img 
          src="https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Gaming setup" 
          className="w-full h-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      
      <div className="container relative z-20 py-24 md:py-32 lg:py-40 text-white">
        <div className="max-w-2xl animate-fadeIn">
          <span className="inline-block px-4 py-2 rounded-full bg-accent-500/20 text-accent-400 backdrop-blur-sm mb-6">
            {t('home.hero.newCollection')}
          </span>
          
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            {t('home.hero.title')}
          </h1>
          
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-lg">
            {t('home.hero.subtitle')}
          </p>
          
          <div className="flex flex-wrap gap-4">
            <Link 
              to="/products" 
              className="group btn btn-accent flex items-center text-lg"
            >
              <ShoppingBag className="mr-2 transition-transform group-hover:scale-110" />
              {t('home.hero.shopNow')}
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Link>
            
            <Link 
              to="/about" 
              className="btn btn-outline border-white text-white hover:bg-white/10 text-lg"
            >
              {t('home.hero.aboutUs')}
            </Link>
          </div>
          
          <div className="mt-12 flex items-center gap-8">
            <div className="flex -space-x-4">
              <img 
                src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg" 
                alt="Customer" 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img 
                src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg" 
                alt="Customer" 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
              <img 
                src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg" 
                alt="Customer" 
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            </div>
            <div className="text-sm">
              <p className="font-semibold">500+ {t('home.hero.happyCustomers')}</p>
              <div className="flex items-center mt-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-accent-400">★</span>
                ))}
                <span className="ml-2">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent z-10"></div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <button 
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
          className="animate-bounce p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-colors"
          aria-label="Scroll down"
        >
          <ArrowRight size={24} className="transform rotate-90" />
        </button>
      </div>
    </section>
  );
};

export default Hero;