import React from 'react';
import { useFormik } from 'formik';
import SignUpSchema from '../schema/SignUpSchema';
import { NavLink } from 'react-router-dom';
import img from '../../public/assets/images/hackathon_logo-removebg-preview.png';
import { API_URL } from '../constant/API_URL.JSX';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
function SignUp() {
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      name: '',
      contact: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
      address: '',
    },
    validationSchema: SignUpSchema,
    onSubmit: (formData) => {
       axios.post(`${API_URL}/signup`, formData)
        .then((response) => {
          
          navigate("/signin")
          alert("Registration Successful")
          console.log(response.data);
        })
      // Add actual submission logic here (e.g., API call)
    },
  });

  return (
    <div className="signup-container">
      <img src={img} alt="Leaf Icon" className="icon" />
      <h2>Sign up</h2>
      <p>Create your free account</p>

      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.name && formik.errors.name ? 'is-invalid' : ''}`}
          placeholder="Name"
          required
        />
        {formik.touched.name && formik.errors.name ? (
          <div className="text-danger">{formik.errors.name}</div>
        ) : null}

        <input
          type="text"
          name="contact"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.contact && formik.errors.contact ? 'is-invalid' : ''}`}
          placeholder="Contact"
          required
        />
        {formik.touched.contact && formik.errors.contact ? (
          <div className="text-danger">{formik.errors.contact}</div>
        ) : null}

        <input
          type="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
          placeholder="Email"
          required
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-danger">{formik.errors.email}</div>
        ) : null}

        <input
          type="text"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.username && formik.errors.username ? 'is-invalid' : ''}`}
          placeholder="Username"
          required
        />
        {formik.touched.username && formik.errors.username ? (
          <div className="text-danger">{formik.errors.username}</div>
        ) : null}

        <input
          type="password"
          name="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
          placeholder="Password"
          required
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-danger">{formik.errors.password}</div>
        ) : null}

        <input
          type="password"
          name="confirmPassword"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'is-invalid' : ''}`}
          placeholder="Confirm Password"
          required
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-danger">{formik.errors.confirmPassword}</div>
        ) : null}

        <textarea
          name="address"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className={`form-control ${formik.touched.address && formik.errors.address ? 'is-invalid' : ''}`}
          placeholder="Address"
          required
        />
        {formik.touched.address && formik.errors.address ? (
          <div className="text-danger">{formik.errors.address}</div>
        ) : null}

        <button type="submit" className="btn btn-custom mt-2">
          Sign up
        </button>
      </form>
      <br />
      <button className="btn social-btn btn-google">
        <img src="https://img.icons8.com/color/48/000000/google-logo.png" alt="Google Logo" />
        Sign up with Google
      </button>

      <button className="btn social-btn btn-apple">
        <img src="https://img.icons8.com/ios-filled/50/mac-os.png" alt="Apple Logo" />
        Sign up with Apple
      </button>

      <p className="terms mt-3">
        By signing up you agree to our <a href="#">Terms of Service</a>.
      </p>
      <p className="login-link">
        Already have an account? <NavLink to="/signin">Sign in</NavLink>
      </p>
    </div>
  );
}

export default SignUp;
