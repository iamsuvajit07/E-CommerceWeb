import React from "react";

export default function Cart({ cart, setCart }) {
  // ✅ Update Quantity Function
  const updateQuantity = (id, amount) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + amount } : item
        )
        .filter((item) => item.quantity > 0) // Remove item if quantity is 0
    );
  };

  // ✅ Calculate Total Price
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Your Cart ({cart.length} items)</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        cart.map((item) => (
          <div key={item.id} className="cart-item">
            <img src={item.image} alt={item.title} className="cart-image" />
            <div className="cart-details">
              <h3>{item.title}</h3>
              <p>Price: ${item.price}</p>
              <p>Category: {item.category}</p>
              <div className="cart-quantity">
                <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                <span>{item.quantity}</span>
                <button onClick={() => updateQuantity(item.id, 1)}>+</button>
              </div>
              <p>Total: ${item.price * item.quantity}</p>
            </div>
          </div>
        ))
      )}

      <h3 className="total-price">Total Price: ${totalPrice.toFixed(2)}</h3>
    </div>
  );
}
