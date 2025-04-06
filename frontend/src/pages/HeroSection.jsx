import React from 'react'
import hackathon_leaf1 from '../../public/assets/images/hackathon_leaf1-removebg-preview.png';
import hackathon_leaf2 from '../../public/assets/images/hackathon_leaf2.png';
import { NavLink } from 'react-router-dom';
const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="row align-items-center text-center text-md-start">
          <div className="col-md-2 mb-4 mb-md-0">
            <img
              src={hackathon_leaf1}
              alt="Leaf Detecting"
              className="leaf-left img-fluid"
            />
          </div>
          <div className="col-md-6">
            <h1>VerdantGuard</h1>
            <p className="tagline">
              <strong>(Verdant = Green & Healthy Leaves, Guarding Crops)</strong>
            </p>
            <p className="quote">“Diagnose. Protect. Prosper.”</p>
            <p className="quote">“Smart Leaf Health Detection at Your Fingertips.”</p>
            <p className="quote">“Detect Early, Act Wisely – AI for Leaf Health.”</p>
            <NavLink to="/signin" className="btn btn-custom mt-3">
              Get Analysis Free →
            </NavLink>
          </div>
          <div className="col-md-4 mt-4 mt-md-0 text-center">
            <div className="leaf-bg shadow-sm">
              <img src={hackathon_leaf2} alt="Happy Leaf" className="leaf-right img-fluid" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection