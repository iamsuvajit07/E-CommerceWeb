import axios from "axios";
import React from "react";

export default function Cart({ cart, setCart, userId }) {

  // ✅ Function to update cart in JSON server
const updateUserCart = async (userId, updatedCart) => {
  try {
      await axios.patch(`http://localhost:5000/users/${userId}`, {
          cart: updatedCart
      });
  } catch (error) {
      console.error("Error updating user cart:", error);
  }
};

// ✅ Modified updateQuantity function
const updateQuantity = (id, amount) => {
    const updatedCart = cart
        .map((item) =>
            item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0); // Remove item if quantity is 0

    setCart(updatedCart);
    updateUserCart(userId, updatedCart);
};

// ✅ Modified removeItem function
const removeItem = (id) => {
    const updatedCart = cart.filter((item) => item.id !== id);
    setCart(updatedCart);
    updateUserCart(userId, updatedCart);
};
  // ✅ Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <div className="container">
         <div className="header-cart">
         <h2>Your Cart Has ({cart.length} Unique {cart.length > 1 ? "Items" : "Item"})</h2>
        <h3 className="total-price">Total Price: ₹{(totalPrice*100).toFixed(2)}</h3>
      </div>
      
      <div className="cart-container">
        {cart.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.title} className="cart-image" />
              <div className="cart-details">
                <h3 className="cart-title">{item.title}</h3>
                <p className="cart-price">Price: ₹{item.price.toFixed(2) * 100}</p>
                <p className="cart-category">Category: {item.category}</p>
                <div className="cart-quantity">
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <span className="quantity">{item.quantity}</span>
                  <button className="qty-btn" onClick={() => updateQuantity(item.id, 1)}>+</button>
                </div>
                <p className="cart-total">Total: ₹{(item.price * item.quantity * 100).toFixed(2) }</p>
                <button className="remove-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))
        )}
      </div>
      </div>
     
    </>
  );
}
