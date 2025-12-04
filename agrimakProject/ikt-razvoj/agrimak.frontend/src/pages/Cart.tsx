import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';

export default function Cart() {
  const { items, totalPrice, totalItems, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
              Looks like you haven't added any products to your cart yet. 
              Start shopping to fill it up with fresh produce!
            </p>
            <Link
              to="/products"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center space-x-2"
            >
              <span>Start Shopping</span>
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Cart Items */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">
                  Shopping Cart ({totalItems} item{totalItems !== 1 ? 's' : ''})
                </h1>
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-700 font-medium transition-colors"
                >
                  Clear Cart
                </button>
              </div>
              
              <div className="space-y-4">
                {items.map((item) => (
                  <CartItem key={item.product.id} item={item} />
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-80">
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Fee</span>
                  <span>{totalPrice >= 50 ? 'FREE' : '$5.00'}</span>
                </div>
                
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${(totalPrice + (totalPrice >= 50 ? 0 : 5)).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {totalPrice < 50 && (
                <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4">
                  <p className="text-sm text-emerald-700">
                    Add ${(50 - totalPrice).toFixed(2)} more to qualify for free delivery!
                  </p>
                </div>
              )}
              
              <Link
                to="/checkout"
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center space-x-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
              
              <Link
                to="/products"
                className="w-full mt-3 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-lg font-medium transition-colors text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}