import React from "react";
import ProductList from "./ProductList";

const AccessoriesPage = ({ cart, setCart }) => {  // ✅ Accept cart & setCart as props
  return (
    <>
      <div className="category-heading">
        <h1>Accessories</h1>
      </div>
      <ProductList categories={["jewelery", "electronics"]} cart={cart} setCart={setCart} />
    </>
  );
};

export default AccessoriesPage;
