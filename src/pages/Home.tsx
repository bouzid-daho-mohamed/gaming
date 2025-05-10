import React, { useEffect } from 'react';
import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import CategorySection from '../components/home/CategorySection';
import PromoSection from '../components/home/PromoSection';
import InstagramSection from '../components/home/InstagramSection';

const Home: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Hero />
      <FeaturedProducts />
      <CategorySection />
      <PromoSection />
      <InstagramSection />
    </div>
  );
};

export default Home;