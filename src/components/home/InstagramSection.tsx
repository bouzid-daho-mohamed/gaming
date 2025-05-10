import React from 'react';
import { Gamepad2 } from 'lucide-react';

const gamingPosts = [
  {
    id: 1,
    image: "https://images.pexels.com/photos/3977908/pexels-photo-3977908.jpeg",
    link: "#"
  },
  {
    id: 2,
    image: "https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg",
    link: "#"
  },
  {
    id: 3,
    image: "https://images.pexels.com/photos/4009598/pexels-photo-4009598.jpeg",
    link: "#"
  },
  {
    id: 4,
    image: "https://images.pexels.com/photos/3945683/pexels-photo-3945683.jpeg",
    link: "#"
  },
  {
    id: 5,
    image: "https://images.pexels.com/photos/7915357/pexels-photo-7915357.jpeg",
    link: "#"
  },
  {
    id: 6,
    image: "https://images.pexels.com/photos/4009626/pexels-photo-4009626.jpeg",
    link: "#"
  }
];

const InstagramSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-900">
      <div className="container">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-white mb-3">Gaming Community</h2>
          <p className="text-gray-400 max-w-2xl mx-auto flex items-center justify-center">
            <Gamepad2 size={18} className="mr-2 text-accent-400" />
            @gaming_hub
          </p>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {gamingPosts.map(post => (
            <a 
              key={post.id} 
              href={post.link}
              className="block aspect-square relative overflow-hidden group"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img 
                src={post.image} 
                alt="Gaming Post" 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gray-900/0 flex items-center justify-center transition-all duration-300 group-hover:bg-gray-900/70">
                <Gamepad2 size={24} className="text-white opacity-0 transform scale-50 transition-all duration-300 group-hover:opacity-100 group-hover:scale-100" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;