// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header        from './components/layout/Header';
import Footer        from './components/layout/Footer';
import Home          from './pages/Home';
import ProductsPage  from './pages/ProductsPage';
import ProductDetail from './pages/ProductDetail';
import Cart          from './pages/Cart';
import About         from './pages/About';
import Contact       from './pages/Contact';
import Admin         from './pages/Admin';
import AdminOrders   from './pages/AdminOrders';
import AddProduct    from './pages/AddProduct';
import ChatBot       from './components/chat/ChatBot';
import { CartProvider } from './context/CartContext';

/* ⬇️  Ping Supabase (diagnostic) */
import SupabasePing  from './components/test/SupabasePing';

function App() {
  return (
    <CartProvider>
      <Router>
        <SupabasePing />

        <div className="flex flex-col min-h-screen">
          <Header />

          <main className="flex-grow">
            <Routes>
              <Route path="/"                 element={<Home />} />
              <Route path="/products"         element={<ProductsPage />} />
              <Route path="/products/:id"     element={<ProductDetail />} />
              <Route path="/cart"             element={<Cart />} />
              <Route path="/about"            element={<About />} />
              <Route path="/contact"          element={<Contact />} />
              <Route path="/admin"            element={<Admin />} />
              <Route path="/admin/orders"     element={<AdminOrders />} />
              <Route path="/addproduct"       element={<AddProduct />} />
            </Routes>
          </main>

          <Footer />
          <ChatBot />
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;