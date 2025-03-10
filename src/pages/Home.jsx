import React from "react";
import "../index.css";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container-fluid">
      <div id="bg-image1"> 
        <section className="container">
          <div id="parent-subdiv">
            <div id="hero1-subdiv1" className="hero1-subdiv">
              <h1 id="subdiv1-h1">Raining Offers For Hot Summer!</h1>
              <div id="subdiv1-div1">
                <h3 id="subdiv1-div1-h3">25% Off On All Products</h3>
              </div>
              <div id="subdiv1-div2">
                <div className="hero1-button" id="shopnow-div">
                <Link className="a-tag" to="/cart">
                    Shop Now
                </Link>
                </div>
                <div className="hero1-button" id="findmore-div">
                <Link className="a-tag" to="/store">
                    Find More
                </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
