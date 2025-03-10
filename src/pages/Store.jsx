import axios from "axios";
import React, { useEffect, useState } from "react";
import Preloader from "../components/Preloader";

export default function Store({ setCart, cart }) {
    const [products, setProducts] = useState([]); // Stores products
    const [loading, setLoading] = useState(true); // Loading state
    const [expanded, setExpanded] = useState({}); // Tracks which product's description is expanded

    // ✅ Fetch Products using async/await
    const fetchProducts = async () => {
        try {
            const response = await axios.get("https://fakestoreapi.com/products");
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    // ✅ Fetch products on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    // ✅ Show preloader while fetching data
    if (loading) return <Preloader />;

    // ✅ Function to add an item to the cart
    const addToCart = (product) => {
        const existingItem = cart.find((item) => item.id === product.id);
        if (existingItem) {
            setCart(
                cart.map((item) =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...product, quantity: 1 }]);
        }
    };

    // ✅ Function to toggle description (Read More / Read Less)
    const toggleReadMore = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id], // Toggle the current product's state
        }));
    };

    return (
        <div className="container product-container">
            {products.map((product) => (
                <div key={product.id} className="product-card">
                    <img src={product.image} alt={product.title} className="product-image" />
                    <h2 className="product-title">{product.title}</h2>
                    <p className="product-category">Category: {product.category}</p>
                    <p className="product-price">₹{(product.price * 100).toFixed(2)}</p>
                    <p className="product-rating">⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
                    
                    {/* ✅ Description with Read More / Read Less toggle */}
                    <p className="product-description">
                        {expanded[product.id] 
                            ? product.description  // Show full description if expanded
                            : `${product.description.slice(0, 50)}...`} {/* Show truncated text */}
                        <br />
                        <button className="read-more" onClick={() => toggleReadMore(product.id)}>
                            {expanded[product.id] ? "Read Less" : "Read More"}
                        </button>
                    </p>

                    <div className="button-div">
                        <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
