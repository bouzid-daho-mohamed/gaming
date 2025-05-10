import React, { useEffect } from 'react';

const About: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24 pb-16">
      {/* Hero section */}
      <div className="relative bg-primary-900 text-white py-24 mb-16">
        <div className="absolute inset-0 opacity-30">
          <img 
            src="https://images.pexels.com/photos/3965545/pexels-photo-3965545.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
            alt="Fashion studio" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="container relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">Our Story</h1>
            <p className="text-lg opacity-90">
              Founded with a passion for exceptional design and quality craftsmanship, Elegance has grown from a small boutique to a recognized name in premium fashion.
            </p>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Our mission */}
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-6">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-4">
            At Elegance, we believe that fashion is more than just clothing—it's a form of self-expression and confidence. Our mission is to provide timeless, high-quality pieces that empower our customers to express their unique style and feel their best every day.
          </p>
          <p className="text-lg text-gray-700">
            We are committed to ethical production, sustainable practices, and creating pieces that transcend seasonal trends to become lasting additions to your wardrobe.
          </p>
        </div>

        {/* Values section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Quality</h3>
            <p className="text-gray-700">
              We source the finest materials and partner with skilled artisans to create products that meet our exacting standards of quality and craftsmanship.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Sustainability</h3>
            <p className="text-gray-700">
              We're committed to ethical production methods and environmentally responsible practices throughout our supply chain and business operations.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-primary-900" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-primary-900 mb-3">Innovation</h3>
            <p className="text-gray-700">
              While respecting traditional craftsmanship, we embrace innovation in design, materials, and technology to create distinctive and forward-thinking collections.
            </p>
          </div>
        </div>

        {/* Team section */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary-900 mb-3">Meet Our Team</h2>
            <p className="text-gray-700 max-w-2xl mx-auto">
              Our dedicated team of designers, stylists, and fashion professionals work together to bring you exceptional products and experiences.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Sophia Chen" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary-900">Sophia Chen</h3>
              <p className="text-accent-600 mb-2">Founder & Creative Director</p>
              <p className="text-gray-600">Visionary fashion designer with over 15 years of industry experience.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Marcus Wright" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary-900">Marcus Wright</h3>
              <p className="text-accent-600 mb-2">Head of Design</p>
              <p className="text-gray-600">Award-winning designer with a focus on sustainable luxury.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Olivia Mendez" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary-900">Olivia Mendez</h3>
              <p className="text-accent-600 mb-2">Style Director</p>
              <p className="text-gray-600">Former fashion editor with a keen eye for emerging trends.</p>
            </div>
            
            <div className="text-center">
              <div className="mb-4 aspect-square rounded-full overflow-hidden">
                <img 
                  src="https://images.pexels.com/photos/1516680/pexels-photo-1516680.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                  alt="Daniel Kim" 
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-primary-900">Daniel Kim</h3>
              <p className="text-accent-600 mb-2">Production Manager</p>
              <p className="text-gray-600">Expert in ethical manufacturing and quality control.</p>
            </div>
          </div>
        </div>

        {/* Journey section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-primary-900 mb-8 text-center">Our Journey</h2>
          
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">2015</h3>
                <p className="text-accent-600">The Beginning</p>
              </div>
              <div className="md:w-2/3 mt-2 md:mt-0">
                <p className="text-gray-700">
                  Elegance was founded as a small boutique in San Francisco, offering a carefully curated selection of designer pieces.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">2017</h3>
                <p className="text-accent-600">First Collection</p>
              </div>
              <div className="md:w-2/3 mt-2 md:mt-0">
                <p className="text-gray-700">
                  We launched our first in-house collection, which quickly gained recognition for its unique blend of modern aesthetics and timeless design.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">2019</h3>
                <p className="text-accent-600">Going Online</p>
              </div>
              <div className="md:w-2/3 mt-2 md:mt-0">
                <p className="text-gray-700">
                  We expanded to e-commerce, bringing our curated collections to fashion enthusiasts worldwide.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">2022</h3>
                <p className="text-accent-600">Sustainability Pledge</p>
              </div>
              <div className="md:w-2/3 mt-2 md:mt-0">
                <p className="text-gray-700">
                  We committed to sustainable and ethical production methods, ensuring all our products meet the highest standards of environmental and social responsibility.
                </p>
              </div>
            </div>
            
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/3">
                <h3 className="text-xl font-semibold text-primary-900 mb-2">Today</h3>
                <p className="text-accent-600">Global Recognition</p>
              </div>
              <div className="md:w-2/3 mt-2 md:mt-0">
                <p className="text-gray-700">
                  Elegance is now recognized globally for our commitment to quality, design excellence, and responsible fashion.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;