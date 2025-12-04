import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { CartItem as CartItemType } from '../types';
import { useCart } from '../context/CartContext';

interface CartItemProps {
  item: CartItemType;
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (newQuantity: number) => {
    updateQuantity(item.product.id, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
      <img
        src={item.product.image}
        alt={item.product.name}
        className="w-16 h-16 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <h3 className="text-lg font-medium text-gray-900 truncate">
          {item.product.name}
        </h3>
        <p className="text-sm text-gray-500">
          ${item.product.price.toFixed(2)} / {item.product.unit}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => handleQuantityChange(item.quantity - 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
          disabled={item.quantity <= 1}
        >
          <Minus className="h-4 w-4 text-gray-500" />
        </button>
        
        <span className="w-8 text-center font-medium text-gray-900">
          {item.quantity}
        </span>
        
        <button
          onClick={() => handleQuantityChange(item.quantity + 1)}
          className="p-1 rounded-full hover:bg-gray-100 transition-colors"
        >
          <Plus className="h-4 w-4 text-gray-500" />
        </button>
      </div>

      <div className="text-right">
        <p className="text-lg font-semibold text-gray-900">
          ${(item.product.price * item.quantity).toFixed(2)}
        </p>
      </div>

      <button
        onClick={handleRemove}
        className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </button>
    </div>
  );
}