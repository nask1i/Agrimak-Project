import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, Truck, Shield, Users } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { useEffect, useState } from 'react';
import { AppStore } from '../utils/Store';

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    AppStore.getProducts().then(result => {
      setData(result);
    }).catch((error) => {
      console.error(error);
      setData([]);
    });
  },[]);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-emerald-800 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: 'url(https://images.pexels.com/photos/1595104/pexels-photo-1595104.jpeg?auto=compress&cs=tinysrgb&w=1200)'
          }}
        ></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to <span className="text-emerald-300">Agrimak</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed">
              Agriculture That Reaches Everyone
            </p>
            <p className="text-lg mb-10 max-w-2xl mx-auto opacity-90">
              Connecting communities with fresh, locally-sourced produce from our trusted farming partners. 
              Supporting sustainable agriculture for a healthier future.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/products"
                className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>View Products</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link
                to="/cart"
                className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-4 rounded-lg font-semibold transition-colors inline-flex items-center justify-center space-x-2"
              >
                <span>Order Now</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Agrimak?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We're committed to providing the freshest, highest-quality agricultural products 
              while supporting local farmers and sustainable practices.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Leaf className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Organic & Fresh</h3>
              <p className="text-gray-600">
                All our produce is certified organic and harvested at peak freshness for maximum nutrition and flavor.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Truck className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast Delivery</h3>
              <p className="text-gray-600">
                Free local delivery within 20 miles for orders over $50. Get your fresh produce within 1-2 days.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Assured</h3>
              <p className="text-gray-600">
                Every product is carefully inspected and meets our high standards for quality and safety.
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-emerald-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-emerald-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Support</h3>
              <p className="text-gray-600">
                Supporting local farmers and contributing to the economic growth of our agricultural community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our most popular and seasonal products, carefully selected for their 
              exceptional quality and freshness.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {data.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center">
            <Link
              to="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
            >
              <span>View All Products</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-emerald-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Order Fresh Produce?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Start shopping our selection of fresh, organic, locally-sourced agricultural products. 
            Have questions? Our chatbot is here to help!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/products"
              className="bg-white text-emerald-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Start Shopping
            </Link>
            <Link
              to="/contact"
              className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors border border-emerald-400"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}