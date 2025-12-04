import { ShoppingCart, Star } from "lucide-react";
import { Category, Product } from "../types";
import { useCart } from "../context/CartContext";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  const getAvailabilityColor = (availability: number) => {
    if (availability > 10) return "text-green-600 bg-green-100";
    else if (availability > 5 && availability <= 10)
      return "text-yellow-600 bg-yellow-100";
    else if (availability >= 1 && availability <= 5)
      return "text-red-600 bg-red-100";
    else return "text-gray-600 bg-gray-100";
  };

  const handleAddToCart = () => {
    if (product.stock > 0) {
      addToCart(product);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden group">
      <div className="relative overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div
          className={`absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-medium ${getAvailabilityColor(
            product.stock
          )}`}
        >
          {product.stock}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 group-hover:text-emerald-600 transition-colors">
            {product.title}
          </h3>
          <span className="text-sm text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
            {Category[product.category]}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex justify-between items-center">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            <span className="text-gray-500 text-sm ml-1">/ {product.unit}</span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
              product.stock === 0
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-emerald-600 hover:bg-emerald-700 text-white hover:shadow-md"
            }`}
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="text-sm">
              {product.stock === 0
                ? "Unavailable"
                : "Add to Cart"}
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
