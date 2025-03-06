// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./icons/logo@2x-free-img-1.png";
import cartIcon from "./icons/parcel.png";

const Navbar = ({ cartCount }) => { // ✅ Accept cartCount
  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          <Link to="/" className="nav-logo">
            <img id="img-logo" src={logo} alt="DNK Logo" />
          </Link>
          <div id="parent-nav-div">
            <ul className="nav-menu">
              {["Home", "Store", "Men", "Women", "Accessories", "Account", "About", "Contact Us"].map((item) => (
                <li className="nav-item" key={item}>
                  <Link to={`/${item.toLowerCase().replace(" ", "-")}`} className="nav-link">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
            <Link to="/cart" id="card-a">
              <img id="cart-img" src={cartIcon} alt="Cart Icon" />
              <span id="cart-count">{cartCount}</span> {/* ✅ Display dynamic cart count */}
            </Link>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
