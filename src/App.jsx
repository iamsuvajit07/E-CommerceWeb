import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./components/Login"; 
import Cart from "./pages/Cart";
import Store from "./pages/Store";
import Account from "./pages/Account";
import About from "./pages/About";
import ContactUs from "./pages/ContactUs";

function App() {  
  const [cart, setCart] = useState([]); 
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  return ( 
    <>
      <Navbar 
        cartCount={cartCount} 
        isAuthenticated={isAuthenticated} 
        setIsAuthenticated={setIsAuthenticated} 
      /> 
      
      <Routes>
        {!isAuthenticated ? (
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
        ) : (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/store" element={<Store setCart={setCart} cart={cart} />} /> 
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
            <Route path="/account" element={<Account />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact-us" element={<ContactUs />} />
            <Route path="*" element={<Home />} />
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
