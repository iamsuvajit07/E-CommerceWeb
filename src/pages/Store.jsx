import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons
import Preloader from "../components/Preloader";

export default function Store({ setCart, cart }) {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [expanded, setExpanded] = useState({});
    const [sortOption, setSortOption] = useState("price");
    const [sortOrder, setSortOrder] = useState("asc");
    const [categoryFilter, setCategoryFilter] = useState("all");

    // ✅ Fetch products from API
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

    useEffect(() => {
        fetchProducts();
    }, []);

    if (loading) return <Preloader />;

    // ✅ Sort products based on selection
    const sortedProducts = [...products]
        .filter(product => categoryFilter === "all" || product.category.toLowerCase() === categoryFilter)
        .sort((a, b) => {
            if (sortOption === "price") {
                return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
            } else if (sortOption === "rating") {
                return sortOrder === "asc" ? a.rating.rate - b.rating.rate : b.rating.rate - a.rating.rate;
            } else if (sortOption === "category") {
                return sortOrder === "asc" ? a.category.localeCompare(b.category) : b.category.localeCompare(a.category);
            }
            return 0;
        });

    // ✅ Add to cart function
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

    // ✅ Toggle Read More / Read Less
    const toggleReadMore = (id) => {
        setExpanded((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    // ⭐ Render dynamic star rating with hover tooltip
    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const halfStar = rating % 1 !== 0;
        const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);

        for (let i = 0; i < fullStars; i++) {
            stars.push(<FaStar key={`full-${i}`} className="star full" />);
        }
        if (halfStar) {
            stars.push(<FaStarHalfAlt key="half" className="star half" />);
        }
        for (let i = 0; i < emptyStars; i++) {
            stars.push(<FaRegStar key={`empty-${i}`} className="star empty" />);
        }

        return (
            <div className="star-container" title={`Rating: ${rating.toFixed(1)}`}>{stars}</div>
        );
    };

    return (
        <div className="container">
            {/* Sorting & Filtering Bar */}
            <div className="sort-bar">
                    <h1 className="sortby-h1">Sort By</h1>
                <select onChange={(e) => setSortOption(e.target.value)}>
                    <option value="price">Price</option>
                    <option value="rating">Popularity</option>
                    <option value="category">Category</option>
                </select>
                <select onChange={(e) => setSortOrder(e.target.value)}>
                    <option value="asc">Low to High</option>
                    <option value="desc">High to Low</option>
                </select>
                <select onChange={(e) => setCategoryFilter(e.target.value.toLowerCase())}>
                    <option value="all">All Categories</option>
                    <option value="men's clothing">Men</option>
                    <option value="women's clothing">Women</option>
                    <option value="jewelery">Accessories</option>
                    <option value="electronics">Electronics</option>
                </select>
            </div>

            {/* Product Listing */}
            <div className="product-container">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img src={product.image} alt={product.title} className="product-image" />
                        <h2 className="product-title">{product.title}</h2>
                        <p className="product-category">Category: {product.category}</p>
                        <p className="product-price">₹{(product.price * 100).toFixed(2)}</p>

                        {/* ⭐ Star rating with tooltip on hover */}
                        <div className="product-rating">
                            {renderStars(product.rating.rate)}
                            <span className="rating-count"> ({product.rating.count} reviews)</span>
                        </div>

                        <p className="product-description">
                            {expanded[product.id] 
                                ? product.description  
                                : `${product.description.slice(0, 50)}...`} 
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
        </div>
    );
}