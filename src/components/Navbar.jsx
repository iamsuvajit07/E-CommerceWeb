import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/icons/logo@2x-free-img-1.png";
import cartIcon from "/icons/parcel.png";

const Navbar = ({ cartCount, isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

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

  // ✅ Logout Handler
  const handleLogout = () => {
    setIsAuthenticated(false); // Set login status to false
    navigate("/"); // Redirect to login page
  };

  return (
    <div>
      <header className="header">
        <nav className="navbar">
          {/* Logo */}
          <Link to="/" className="nav-logo">
            <img id="img-logo" src={logo} alt="DNK Logo" />
          </Link>

          <div id="parent-nav-div" ref={menuRef}>
            {/* ✅ Navigation Menu */}
            <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
              {["Home", "Store", "Account", "About", "Contact Us"].map((item) => {
                let path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;

                return (
                  <li className="nav-item" key={item}>
                    <Link
                      to={path}
                      className="nav-link"
                      onClick={() => setIsOpen(false)}
                    >
                      {item}
                    </Link>
                  </li>
                );
              })}

              {/* ✅ Login / Logout Button */}
              <li className="nav-item">
                {isAuthenticated ? (
                  <button className="nav-link logout-btn" onClick={handleLogout}>
                    Logout
                  </button>
                ) : (
                  <Link to="/" className="nav-link" onClick={() => setIsOpen(false)}>
                    Login
                  </Link>
                )}
              </li>
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
