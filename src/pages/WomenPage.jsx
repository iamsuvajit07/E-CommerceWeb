import React from "react";
import ProductList from "./ProductList";

const WomenPage = () => {
  return (
    <>
    <div className="category-heading">      
      <h1 >Women's Clothing</h1>
    </div>
      <ProductList categories="women's clothing" />
    </>
  );
};

export default WomenPage;
