import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import logo from "/icons/logo@2x-free-img-1.png";
import cartIcon from "/icons/parcel.png";

const Navbar = ({ cartCount }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // Reference for menu container

  // ✅ Toggle mobile menu
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // ✅ Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    // Listen for clicks or touches anywhere in the document
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isOpen]);

  // ✅ Close menu when scrolling
  useEffect(() => {
    const handleScroll = () => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isOpen]);

  return (
    <div className="container">
      <header className="header">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img id="img-logo" src={logo} alt="DNK Logo" />
          </Link>

          <div id="parent-nav-div" ref={menuRef}>
            {/* ✅ Navigation Menu */}
            <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
              {["Home", "Store", "Men", "Women", "Accessories", "Account", "About", "Contact Us"].map((item) => {
                let path;
                if (item === "Home") {
                  path = "/"; // Home links to root path
                } else if (item === "Contact Us") {
                  path = "/contact-us"; // Contact Us links to /contact
                } else {
                  path = `/${item.toLowerCase()}`;
                }
                
                return (
                  <li className="nav-item" key={item}>
                    <Link
                      to={path}
                      className="nav-link"
                      onClick={() => setIsOpen(false)} // Close menu on click
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* ✅ Cart Icon with Dynamic Count */}
            <Link to="/cart" id="card-a">
              <img id="cart-img" src={cartIcon} alt="Cart Icon" />
              <span id="cart-count">{cartCount}</span>
            </Link>

            {/* ✅ Hamburger Menu for Mobile */}
            <div
              className={`hamburger ${isOpen ? "active" : ""}`}
              onClick={toggleMenu}
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;