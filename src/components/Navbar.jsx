import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "/icons/logo@2x-free-img-1.png";
import cartIcon from "/icons/parcel.png";

const Navbar = ({ cartCount, isAuthenticated, setIsAuthenticated }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  // ✅ Check localStorage for authentication on component mount
  useEffect(() => {
    const user = localStorage.getItem("user");
    setIsAuthenticated(!!user);
  }, [setIsAuthenticated]);

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
    localStorage.removeItem("userSession"); // Remove session
    setIsAuthenticated(false);
    navigate("/"); // Redirect to Login page
  };

  return (
    <header className="header">
      <nav className="navbar">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <img id="img-logo" src={logo} alt="DNK Logo" />
        </Link>

        <div id="parent-nav-div" ref={menuRef}>
          {/* ✅ Navigation Menu (Show only if logged in) */}
          {isAuthenticated ? (
            <ul className={`nav-menu ${isOpen ? "active" : ""}`}>
              {["Home", "Store", "Account", "About", "Contact Us"].map((item) => {
                let path = item === "Home" ? "/" : `/${item.toLowerCase().replace(" ", "-")}`;
                return (
                  <li className="nav-item" key={item}>
                    <Link to={path} className="nav-link" onClick={() => setIsOpen(false)}>
                      {item}
                    </Link>
                  </li>
                );
              })}
              {/* ✅ Logout Button */}
              <li className="nav-item">
                <button className="nav-link logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            // ✅ Show only "Login" when user is NOT logged in
            <ul className="nav-menu">
              <li className="nav-item">
                <Link to="/" className="nav-link">Login</Link>
              </li>
            </ul>
          )}

          {/* ✅ Cart Icon (Only if logged in) */}
          {isAuthenticated && (
            <Link to="/cart" id="card-a">
              <img id="cart-img" src={cartIcon} alt="Cart Icon" />
              <span id="cart-count">{cartCount}</span>
            </Link>
          )}

          {/* ✅ Hide Hamburger Menu when not logged in */}
          {isAuthenticated && (
            <div className={`hamburger ${isOpen ? "active" : ""}`} onClick={toggleMenu}>
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
