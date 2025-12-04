import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Category, Product } from "../types";
import { AppStore } from "../utils/store";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState<Category>(Category.AllProducts);
  const [products, setProducts] = useState<Product[]>([]);
  const [cateogries, setCategories] = useState<any[]>([]);

  useEffect(() => {
    AppStore.getProductsByType(selectedCategory).then((result) => {
      setProducts(result);
    });

     const tmp: { key: string; value: number }[] = Object.entries(Category)
      .filter(([key]) => isNaN(Number(key))) // remove numeric keys
      .map(([key, value]) => ({ key, value: Number(value) }));
    setCategories(tmp);
  }, [selectedCategory]);

  const handleCategoryChange = (category: Category) => {
    setSelectedCategory(category);
    // if (category === "All Products") {
    //   searchParams.delete("category");
    // } else {
    //   searchParams.set("category", category);
    // }
    setSearchParams(searchParams);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl">
            Fresh, organic, and locally-sourced agricultural products delivered
            straight from our trusted farming partners to your table.
          </p>
        </div>
      </section>

      {/* Category Tabs */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1 overflow-x-auto py-4">
            {cateogries.map((category) => (
              <button
                key={category.key}
                onClick={() => handleCategoryChange(category.key as Category)}
                className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === category
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {category.key}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {products.length > 0 ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <p className="text-gray-600">
                  Showing {products.length} product
                  {products.length !== 1 ? "s" : ""}
                  {selectedCategory !== Category.AllProducts &&
                    ` in ${selectedCategory}`}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No products found matching your criteria.
              </p>
              <button
                onClick={() => {
                  setSelectedCategory(Category.AllProducts);
                }}
                className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
              >
                Clear filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
