import axios from "axios";
import React, { useEffect, useState } from "react";
import Preloader from "./Preloader";

export default function Store({ setCart, cart }) { //  Accept setCartCount
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("https://fakestoreapi.com/products")
            .then((response) => setProducts(response.data))
            .catch((error) => console.error("Error fetching products:", error))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <Preloader />;
    // const addToCart = () => {
    //     setCartCount(prev => prev + 1); //  Increase cart count
    // };

     const addToCart = (product) => {
    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(
        cart.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };



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
                        <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button> {/*  Update count */}
                        <button className="buy-now">Buy Now</button>
                    </div>
                </div>
            ))}
        </div>
    );
}
