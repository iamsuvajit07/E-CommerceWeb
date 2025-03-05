import React, { useEffect, useState } from "react";
import logo from "./icons/logo@2x-free-img-1.png";
import cartIcon from "./icons/parcel.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Toggle menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Close menu on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isOpen]);
  

  return (
    <div className="container">
    <header className="header">
      <nav className="navbar">
        <Link to="/home" className="nav-logo">
          <img id="img-logo" src={logo} alt="DNK Logo" />
        </Link>
        <div id="parent-nav-div">
          <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
            {[
              "Home",
              "Store",
              "Men",
              "Women",
              "Accessories",
              "Account",
              "About",
              "Contact Us",
            ].map((item) => (
              <li className="nav-item" key={item}>
                <Link
                  to={`/${item.toLowerCase().replace(" ", "-")}`}
                  className="nav-link"
                  onClick={() => setIsOpen(false)}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/cart" id="card-a">
            <img id="cart-img" src={cartIcon} alt="Cart Icon" />
            <span id="cart-count">0</span>
          </Link>
          <div
            className={`hamburger ${isOpen ? "active" : ""}`}
            onClick={toggleMenu}
          >
            <div className="hamburger">
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </div>
      </nav>
    </header>
    </div>
  );
};

export default Navbar;
