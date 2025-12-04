import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCart,
  Menu,
  X,
  ChevronDown,
  Leaf,
  LogIn,
  LogOut,
} from "lucide-react";
import { useCart } from "../context/CartContext";
import { Category } from "../types";
import LoginForm from "../pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../utils/reduxstore";
import { logout } from "../utils/authSlice";
import { AppStore } from "../utils/store";

export default function Header() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const { totalItems } = useCart();
  const location = useLocation();
  const [categories, setCategories] = useState<any[]>([]);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    const tmp: { key: string; value: number }[] = Object.entries(Category)
      .filter(([key]) => isNaN(Number(key))) // remove numeric keys
      .map(([key, value]) => ({ key, value: Number(value) }));
    setCategories(tmp);
  }, []);

  const logoutAsync = async () => {
    try {
      await AppStore.logout().then(() => {
        dispatch(logout())
      });
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path
      ? "text-emerald-600"
      : "text-gray-700 hover:text-emerald-600";
  };

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Leaf className="h-8 w-8 text-emerald-600" />
            <span className="text-2xl font-bold text-gray-900">Agrimak</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`transition-colors ${isActive("/")}`}>
              Home
            </Link>

            {/* Products Dropdown */}
            <div
              className="relative"
              onClick={() => setIsProductsDropdownOpen(! isProductsDropdownOpen)}
            >
              <button
                className={`flex items-center space-x-1 transition-colors ${isActive(
                  "/products"
                )}`}
              >
                <span>Products</span>
                <ChevronDown className="h-4 w-4" />
              </button>

              {isProductsDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-50">
                  <Link
                    to="/products"
                    className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                  >
                    All Products
                  </Link>
                  {categories.slice(1).map((category) => (
                    <Link
                      key={category.key}
                      to={`/products?category=${encodeURIComponent(
                        category.value
                      )}`}
                      className="block px-4 py-2 text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                    >
                      {category.key}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/about"
              className={`transition-colors ${isActive("/about")}`}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className={`transition-colors ${isActive("/contact")}`}
            >
              Contact
            </Link>
          </nav>

          {/* Cart & Mobile Menu & Login */}
          <div className="flex items-center space-x-4">
            {user ? <p>{user.email}</p> : ""}
            {user && (<Link
              to="/adminpanel"
              className={`transition-colors ${isActive("/about")}`}
            >
              Admin panel
            </Link>)}
            <Link
              to="/cart"
              className="relative p-2 text-gray-700 hover:text-emerald-600 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700 hover:text-emerald-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>

            {user ? (
              <button
                onClick={logoutAsync} // call your logout function here
                className="p-2 text-red-600 hover:text-red-800 transition-colors"
                title="Logout"
              >
                <LogOut className="h-6 w-6" />
              </button>
            ) : (
              <button
                onClick={() => setShowLogin(true)}
                className="p-2 text-gray-700 hover:text-emerald-600 transition-colors"
                title="Admin Login"
              >
                <LogIn className="h-6 w-6" />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className={`transition-colors ${isActive("/")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/products"
                className={`transition-colors ${isActive("/products")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                to="/about"
                className={`transition-colors ${isActive("/about")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className={`transition-colors ${isActive("/contact")}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
      {showLogin && <LoginForm onClose={() => setShowLogin(false)} />}
    </header>
  );
}
