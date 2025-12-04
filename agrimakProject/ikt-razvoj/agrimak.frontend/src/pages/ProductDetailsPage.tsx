import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Product } from "../types";
import { AppStore } from "../utils/store";
import { useCart } from "../context/CartContext";

export default function ProductDetailsPage() {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    async function fetchProduct() {
      setLoading(true);
      try {
        const result = await AppStore.getProduct(id!);
        setProduct(result);
      } catch {
        setProduct(null);
      } finally {
        setLoading(false);
      }
    }
    if (id) fetchProduct();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-gray-500">Loading...</span>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex justify-center items-center h-96">
        <span className="text-red-500">Product not found.</span>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-xl shadow-md p-6 mt-8">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.title}</h1>
      <p className="text-gray-700 mb-4">{product.description}</p>
      <div className="flex items-center justify-between mb-6">
        <span className="text-xl font-semibold text-emerald-700">
          ${product.price.toFixed(2)}
        </span>
        <span className="text-gray-500 text-sm">Stock: {product.stock}</span>
      </div>
      <button
        onClick={() => addToCart(product)}
        disabled={product.stock === 0}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          product.stock === 0
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-emerald-600 hover:bg-emerald-700 text-white"
        }`}
      >
        {product.stock === 0 ? "Unavailable" : "Add to Cart"}
      </button>
    </div>
  );
}