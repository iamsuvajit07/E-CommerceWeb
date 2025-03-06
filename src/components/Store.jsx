import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Store({ setCartCount }) { // ✅ Accept setCartCount
    const [products, setProducts] = useState([]);

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error));
    }, []);

    const addToCart = () => {
        setCartCount(prev => prev + 1); // ✅ Increase cart count
    };

    if (products.length === 0) return <p>Loading products...</p>;

    return (
        <div className="product-container">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-category">Category: {product.category}</p>
                    <p className="product-price">${product.price}</p>
                    <p className="product-rating">⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
                    <p className="product-description">{product.description.slice(0, 100)}...</p>
                    <div className="button-div">
                        <button className="add-to-cart" onClick={addToCart}>Add to Cart</button> {/* ✅ Update count */}
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
