// import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Leaf className="h-8 w-8 text-emerald-400" />
              <span className="text-2xl font-bold">Agrimak</span>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Supporting local agriculture and connecting communities with fresh, 
              sustainable produce from our trusted farming partners.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-emerald-400 transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Home
              </Link>
              <Link to="/products" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Products
              </Link>
              <Link to="/about" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                About Us
              </Link>
              <Link to="/contact" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Product Categories */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Categories</h3>
            <div className="space-y-2">
              <Link to="/products?category=Vegetables" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Vegetables
              </Link>
              <Link to="/products?category=Fruits" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Fruits
              </Link>
              <Link to="/products?category=Dairy" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Dairy
              </Link>
              <Link to="/products?category=Honey" className="block text-gray-300 hover:text-emerald-400 transition-colors">
                Honey
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">123 Agriculture St, Farm City, FC 12345</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">(555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-emerald-400 flex-shrink-0" />
                <span className="text-gray-300 text-sm">info@agrimak.com</span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Signup
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div>
              <h3 className="text-lg font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300 text-sm">Get the latest news about fresh produce and seasonal offers.</p>
            </div>
            <div className="flex space-x-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-lg focus:outline-none focus:border-emerald-400 transition-colors"
              />
              <button className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div> */}

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-400 text-sm">
            © 2024 Agrimak. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-400 hover:text-emerald-400 text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}