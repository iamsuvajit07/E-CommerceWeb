import React from "react";
import ProductList from "./ProductList";

const MenPage = () => {
  return (
    <>
    <div className="category-heading">      
      <h1>Men's Clothing</h1>
    </div>
      <ProductList categories="men's clothing" />
    </>
  );
};

export default MenPage;
