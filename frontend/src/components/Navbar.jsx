import React from 'react'
import { NavLink } from 'react-router-dom';
import hackathon_logo from '../../public/assets/images/hackathon_logo-removebg-preview.png';
const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light px-4"
      style={{ backgroundColor: '#f5fbd2' }}
    >
      <div className="container-fluid">
        <NavLink className="navbar-brand d-flex align-items-center" to="">
          <img src={hackathon_logo} alt="logo" />
          <strong>VerdantGuard</strong>
        </NavLink>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarContent"
          aria-controls="navbarContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          className="collapse navbar-collapse justify-content-between"
          id="navbarContent"
        >
          {/* Center Nav Items */}
          <ul className="navbar-nav mx-auto mb-2 mb-lg-0">
            <li className="nav-item mx-2">
              <NavLink className="nav-link fw-semibold" to="">
                Home
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link fw-semibold" to="/howitworks">
                How it works?
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link fw-semibold" to="/about">
                About Us
              </NavLink>
            </li>
            <li className="nav-item mx-2">
              <NavLink className="nav-link fw-semibold" to="/contact">
                contact
              </NavLink>
            </li>
          </ul>

          {/* Right Side Sign In/Up */}
          <div className="d-flex">
          <div className="d-flex">
          <NavLink className="nav-link fw-semibold text-secondary mx-2" to="/signin">
           Sign in
           </NavLink>
           <NavLink className="nav-link fw-semibold text-secondary mx-2" to="/signup">
           Sign up
          </NavLink>
           </div>

          </div>
        </div>
      </div>
    </nav>
  );
}
export default Navbar