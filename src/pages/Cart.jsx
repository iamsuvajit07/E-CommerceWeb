import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Cart({ cart, setCart, userId }) {
  const [cartItems, setCartItems] = useState([]);

  // ✅ Fetch product details for cart items
  useEffect(() => {
    if (cart.length > 0) {
        fetch("http://localhost:5000/products")
            .then(res => res.json())
            .then(products => {
                const userCartItems = cart.map(cartItem => {
                    const product = products.find(p => p.id === cartItem.id);
                    return product ? { ...product, quantity: cartItem.quantity } : null;
                }).filter(item => item !== null);

                setCartItems(userCartItems);
            })
            .catch(err => console.error("Error fetching products:", err));
    } else {
        setCartItems([]);
    }
}, [cart]);


  // ✅ Function to update cart in JSON server
  const updateUserCart = async (userId, updatedCart) => {
    try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
        cart: updatedCart,
      });
    } catch (error) {
      console.error("Error updating user cart:", error);
    }
  };

  // ✅ Update quantity of an item
  const updateQuantity = (productId, amount) => {
    const updatedCart = cart
        .map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter(item => item.quantity > 0); // Remove item if quantity is 0

    setCart(updatedCart);
    updateUserCart(userId, updatedCart);

    // Update UI immediately
    setCartItems(cartItems
        .map(item =>
            item.id === productId ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter(item => item.quantity > 0)
    );
};


  // ✅ Remove item from cart
  const handleRemove = async (productId) => {
    try {
      const updatedCart = cart.filter((item) => item.id !== productId);
      setCart(updatedCart);
      setCartItems(cartItems.filter((item) => item.id !== productId));

      await updateUserCart(userId, updatedCart);
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  // ✅ Calculate total price correctly
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container">
      <div className="header-cart">
        <h2>Your Cart Has ({cartItems.length} Unique {cartItems.length > 1 ? "Items" : "Item"})</h2>
        <h3 className="total-price">Total Price: ₹{(totalPrice * 100).toFixed(2)}</h3>
      </div>

      <div className="cart-container">
        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-image" />
              <div className="cart-details">
                <h3 className="cart-title">{item.title}</h3>
                <p className="cart-price">Price: ₹{(item.price * 100).toFixed(2)}</p>
                <p className="cart-category">Category: {item.category}</p>
                <div className="cart-quantity">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className="cart-total">Total: ₹{(item.price * item.quantity * 100).toFixed(2)}</p>
                <button className="remove-btn" onClick={() => handleRemove(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
