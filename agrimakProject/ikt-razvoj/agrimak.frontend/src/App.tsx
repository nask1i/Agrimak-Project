import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminPanel from './pages/AdminPanle';
import ProductDetailsPage from './pages/ProductDetailsPage';

function App() {
  return (
    <CartProvider>
      <Router>
        <div className="min-h-screen bg-gray-50 flex flex-col">
          <Header />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/adminpanel" element={<AdminPanel />} />
              <Route path="/product/:id" element={<ProductDetailsPage />} />
            </Routes>
          </main>
          <Footer />
          <Chatbot />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;