import React from "react";
import "../index.css";

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
                  <a className="a-tag" href="#">
                    Shop Now
                  </a>
                </div>
                <div className="hero1-button" id="findmore-div">
                  <a className="a-tag" href="#">
                    Find More
                  </a>
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
