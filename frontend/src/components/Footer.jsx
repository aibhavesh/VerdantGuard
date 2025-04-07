import React from 'react';
import '../../public/assets/bootstrap/css/bootstrap.css';
import '../App.css';
import { NavLink } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="footer bg-light text-center text-lg-start">
      <div className="container p-4">
        {/* Section: Links */}
        <div className="row">
          <div className="col-lg-6 col-md-12 mb-4 mb-md-0">
            <h5 className="text-uppercase">About VerdantGuard</h5>
            <p>
              VerdantGuard is your AI-powered solution for smart leaf health detection, ensuring crop safety and prosperity. Diagnose early, act wisely.
            </p>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="" className="text-dark">Home</NavLink>
              </li>
              <li>
                <a to="/howitwork" className="text-dark">How it works?</a>
              </li>
              <li>
                <NavLink to="/about" className="text-dark">About Us</NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="text-dark">Contact</NavLink>
              </li>
            </ul>
          </div>

          <div className="col-lg-3 col-md-6 mb-4 mb-md-0">
            <h5 className="text-uppercase">Follow Us</h5>
            <ul className="list-unstyled">
              <li>
                <NavLink to="www.facebook.com" className="text-dark">Facebook</NavLink>
              </li>
              <li>
                <NavLink to="www.twitter.com" className="text-dark">Twitter</NavLink>
              </li>
              <li>
                <NavLink to="www.instagram.com" className="text-dark">Instagram</NavLink>
              </li>
              <li>
                <NavLink to="" className="text-dark">LinkedIn</NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="text-center p-3" style={{ backgroundColor: '#f5fbd2' }}>
        © {new Date().getFullYear()} VerdantGuard. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
