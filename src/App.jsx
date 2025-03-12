import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
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
  const [userId, setUserId] = useState(null); 
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (userId) {
      axios.get(`http://localhost:5000/users/${userId}`)
        .then(response => {
          setCart(response.data.cart || []);
        })
        .catch(error => {
          console.error("Error fetching cart data:", error);
        });
    }
  }, [userId]);

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
          <Route path="*" element={<Login setIsAuthenticated={setIsAuthenticated} setUserId={setUserId} setCart={setCart} />} />
        ) : (
          <>
            <Route path="/" element={<Home setUserId={setUserId} />} />
            <Route path="/cart" element={<Cart cart={cart} setCart={setCart} userId={userId} />} />
            <Route path="/store" element={<Store setCart={setCart} cart={cart} userId={userId} />} /> 
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
