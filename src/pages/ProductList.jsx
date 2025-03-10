import React, { useEffect, useState } from "react";
import Preloader from "../components/Preloader";

const ProductList = ({ categories, cart, setCart }) => {  // ✅ Accept cart and setCart
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        const filteredProducts = data.filter((product) =>
          categories.includes(product.category)
        );
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, [categories]);

  if (loading) return <Preloader />;

  // ✅ Ensure cart is not undefined before accessing .find()
  const addToCart = (product) => {
    if (!cart) return; // Prevent error if cart is undefined

    const existingItem = cart.find((item) => item.id === product.id);
    if (existingItem) {
      setCart(cart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  return (
    <div className="product-container">
      {products.map((product) => (
        <div className="product-card" key={product.id}>
          <img src={product.image} alt={product.title} className="product-image" />
          <h3 className="product-title">{product.title}</h3>
          <p className="product-category">{product.category}</p>
          <p className="product-price">₹{(product.price * 100).toFixed(2)}</p>
          <p className="product-rating">⭐ {product.rating.rate} ({product.rating.count} reviews)</p>
          
          <p className="product-description">
            {expanded[product.id] ? product.description : `${product.description.substring(0, 80)}...`}
          </p>

          <button className="read-more" onClick={() => setExpanded({ ...expanded, [product.id]: !expanded[product.id] })}>
            {expanded[product.id] ? "Read Less" : "Read More"}
          </button>

          <div className="button-div">
            <button className="add-to-cart" onClick={() => addToCart(product)}>Add to Cart</button>
            <button className="buy-now">Buy Now</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
