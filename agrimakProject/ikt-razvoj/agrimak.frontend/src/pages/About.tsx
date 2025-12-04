import React from 'react';
import { Users, Leaf, Heart, Award, Target, Globe } from 'lucide-react';

export default function About() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-700 to-emerald-500 text-white">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-20"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1200)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">About Agrimak</h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Connecting communities with fresh, sustainable produce while supporting local farmers and promoting agricultural excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Agrimak, we believe that everyone deserves access to fresh, high-quality agricultural products. 
                Our mission is to bridge the gap between local farmers and consumers, creating a sustainable 
                ecosystem that benefits both communities and the environment.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                We are committed to promoting sustainable farming practices, supporting local agricultural 
                communities, and ensuring that fresh, nutritious produce is accessible to everyone in our region.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Farmers working in field"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core principles guide everything we do and shape our commitment to excellence 
              in agricultural services and community support.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Sustainability</h3>
              <p className="text-gray-600">
                We promote environmentally responsible farming practices that preserve our land 
                for future generations while maintaining high-quality produce.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Community</h3>
              <p className="text-gray-600">
                We believe in building strong relationships with local farmers and communities, 
                creating opportunities for mutual growth and support.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Quality</h3>
              <p className="text-gray-600">
                We maintain the highest standards for all our products, ensuring that every item 
                meets our rigorous quality and freshness requirements.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Heart className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Care</h3>
              <p className="text-gray-600">
                Every product is handled with care from farm to table, ensuring maximum freshness 
                and nutritional value for our customers.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
              <p className="text-gray-600">
                We continuously explore new methods and technologies to improve agricultural 
                practices and better serve our community.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Globe className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Accessibility</h3>
              <p className="text-gray-600">
                We work to make fresh, healthy produce accessible to everyone in our community, 
                regardless of their location or circumstances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Impact</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Through our partnerships with local farmers and commitment to sustainable practices, 
              we're making a positive difference in our community.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">50+</div>
              <p className="text-gray-600 font-medium">Partner Farms</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">10,000+</div>
              <p className="text-gray-600 font-medium">Satisfied Customers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">95%</div>
              <p className="text-gray-600 font-medium">Organic Products</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-emerald-600 mb-2">24/7</div>
              <p className="text-gray-600 font-medium">Online Ordering</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Our dedicated team of agricultural experts, community liaisons, and customer service 
              professionals work together to bring you the best products and service.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Sarah Johnson"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Sarah Johnson</h3>
                <p className="text-emerald-600 font-medium mb-3">Agricultural Director</p>
                <p className="text-gray-600 text-sm">
                  With over 15 years in agricultural management, Sarah ensures our quality 
                  standards and farmer partnerships remain exceptional.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Michael Chen"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Michael Chen</h3>
                <p className="text-emerald-600 font-medium mb-3">Operations Manager</p>
                <p className="text-gray-600 text-sm">
                  Michael oversees our logistics and delivery operations, ensuring fresh 
                  produce reaches customers quickly and safely.
                </p>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src="https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=400"
                alt="Emily Rodriguez"
                className="w-full h-64 object-cover"
              />
              <div className="p-6 text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Emily Rodriguez</h3>
                <p className="text-emerald-600 font-medium mb-3">Community Outreach</p>
                <p className="text-gray-600 text-sm">
                  Emily builds relationships with local communities and coordinates our 
                  educational programs about sustainable agriculture.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Join Our Community</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Be part of the sustainable agriculture movement. Together, we can support local farmers, 
            promote healthy eating, and build stronger communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/products"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </a>
            <a
              href="/contact"
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors border border-emerald-400"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}