import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Store from "./components/Store";

function App() {  
  const [cartCount, setCartCount] = useState(0); 

  return (
    <>
      <Navbar cartCount={cartCount} /> 
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store setCartCount={setCartCount} />} /> {/* ✅ Pass setCartCount */}
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </>
  );
}

export default App;
