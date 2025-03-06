import React, { useEffect, useState } from "react";

export default function Cart() {
    const [cart, setCart] = useState([
        {
            id: 1,
            title: "John Hardy Women's Legends Naga Gold & Silver Dragon Bracelet",
            price: 695,
            image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
            quantity: 1,
        },
        {
            id: 2,
            title: "Mens Casual Slim Fit",
            price: 15.99,
            image: "https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_.jpg",
            quantity: 1,
        },
    ]);

    const [cartCount, setCartCount] = useState(0);

    // Update cart count whenever quantity changes
    useEffect(() => {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(totalItems);
    }, [cart]);

    // Function to handle quantity increase
    const increaseQuantity = (id) => {
        setCart((prevCart) =>
            prevCart.map((item) =>
                item.id === id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    };

    // Function to handle quantity decrease
    const decreaseQuantity = (id) => {
        setCart(
            (prevCart) =>
                prevCart
                    .map((item) =>
                        item.id === id && item.quantity > 1
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                    )
                    .filter((item) => item.quantity > 0) // Remove items with zero quantity
        );
    };

    // Function to remove item from cart
    const removeFromCart = (id) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    };

    return (
        <div>
            <h2>Cart ({cartCount})</h2>
            {cart.map((item) => (
                <div key={item.id} className="cart-item">
                    <img src={item.image} alt={item.title} className="cart-image" />
                    <div className="cart-details">
                        <h3>{item.title}</h3>
                        <p>${item.price}</p>
                        <div className="counter">
                            <button onClick={() => decreaseQuantity(item.id)}>-</button>
                            <span>{item.quantity}</span>
                            <button onClick={() => increaseQuantity(item.id)}>+</button>
                        </div>
                        <button
                            onClick={() => removeFromCart(item.id)}
                            className="remove-btn"
                        >
                            Remove From Cart
                        </button>
                        <p>Total: ${item.price * item.quantity}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
