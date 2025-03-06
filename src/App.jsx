import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import Cart from "./components/Cart";
import Store from "./components/Store";

function App() {  
  const [cart, setCart] = useState([]); 

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  return ( 
    <>
      <Navbar cartCount={cartCount} /> 
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/store" element={<Store setCart={setCart} cart={cart} />} /> 
        <Route path="/cart" element={<Cart cart={cart} setCart={setCart}/>} />
      </Routes>
    </>
  );
}

export default App;
