import React from 'react';
import { Link } from 'react-router-dom';
import { Gamepad2, Headphones, Trophy } from 'lucide-react';

const PromoSection: React.FC = () => {
  return (
    <section className="py-20 bg-gray-800 text-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 right-0 h-32 bg-accent-500 opacity-20 transform -skew-y-6"></div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-accent-500 opacity-20 transform skew-y-6"></div>
      </div>

      <div className="container relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Join the Gaming Community</h2>
          <p className="text-lg opacity-90 mb-8">
            Stay updated with the latest gaming gear, exclusive deals, and gaming community events.
          </p>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl">
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-md focus:outline-none focus:ring-2 focus:ring-accent-500 bg-gray-800 text-white"
                required
              />
              <button type="submit" className="btn btn-accent whitespace-nowrap">
                Join Now
              </button>
            </form>
            <p className="text-sm mt-4 opacity-80">
              Join our gaming community and get exclusive access to new releases and special offers.
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-900/40 transition-colors">
              <div className="flex justify-center mb-4">
                <Gamepad2 size={32} className="text-accent-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Gaming Gear</h3>
              <p className="opacity-80">Premium gaming accessories</p>
            </div>
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-900/40 transition-colors">
              <div className="flex justify-center mb-4">
                <Trophy size={32} className="text-accent-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">Exclusive Rewards</h3>
              <p className="opacity-80">Member-only benefits</p>
            </div>
            <div className="bg-gray-900/30 backdrop-blur-sm rounded-lg p-6 hover:bg-gray-900/40 transition-colors">
              <div className="flex justify-center mb-4">
                <Headphones size={32} className="text-accent-400" />
              </div>
              <h3 className="text-xl font-medium mb-3">24/7 Support</h3>
              <p className="opacity-80">Expert gaming assistance</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;