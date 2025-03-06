import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Store({ cartItems, setCartItems }) { // ✅ Accept cart state
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios.get("https://fakestoreapi.com/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const addToCart = (product) => {
        setCartItems([...cartItems, product]); // ✅ Add product to cart
    };

    if (products.length === 0) return <p>Loading products...</p>;

    return (
        <div className="product-container">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-price">${product.price}</p>
                    <button className="add-to-cart" onClick={() => addToCart(product)}> {/* ✅ Add to cart */}
                        Add to Cart
                    </button>
                </div>
            ))}
        </div>
    );
}
