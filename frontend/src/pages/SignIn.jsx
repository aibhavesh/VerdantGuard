import React from 'react';
import '../../public/assets/bootstrap/css/bootstrap.css';
import '../App.css';
import signin_leaf from '../../public/assets/images/signin-removebg-preview.png';
import leaf_pattern from '../../public/assets/images/green-dust-and-scratches.png';
import { NavLink } from 'react-router-dom';
import { useFormik } from 'formik';
import SignInSchema from '../schema/SignInSchema';
import axios from 'axios';
import { API_URL } from '../constant/API_URL.jsx';
const SignIn = () => {

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: SignInSchema,
    onSubmit: (formData) => {
      axios.post(`${API_URL}/signinauth`, formData)
      .then((response)=>{
        if(response.data.success){
          localStorage.setItem('token', response.data.token);
          localStorage.setItem('name', response.data.name);
          window.location.href = '/upload';
        }
        else{
          if(response.data.errType === 1){
            alert('Email ID is incorrect!');
          }
          else{
            alert('Password is incorrect!');
          }
        }
      })
  }
  });

  return (
    <div
      style={{
        backgroundImage: `url(${leaf_pattern})`,
        backgroundRepeat: 'repeat',
        backgroundSize: '300px auto',
        backgroundColor: '#f5fbd2',
        fontFamily: 'Segoe UI, sans-serif',
        minHeight: '100vh',
      }}
    >
      <div className="container mt-5" style={{ maxWidth: '900px' }}>
        <div className="card shadow rounded">
          <div className="row g-0">
            <div className="col-md-6  " style={{ padding: '30px' }}>
              <h2 className="text-center mb-4" style={{ color: '#d97c0b' }}>
                Sign in
              </h2>
              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Email</label>
                  <input
                    type="email"
                    name="email"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.email && formik.errors.email ? 'is-invalid' : ''}`}
                    placeholder="example.email@gmail.com"
                    required
                  />
                  {formik.touched.email && formik.errors.email ? (
                    <div className="text-danger">{formik.errors.email}</div>
                  ) : null}
                </div>
                <div className="mb-3">
                  <label className="form-label fw-semibold">Password</label>
                  <input
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`form-control ${formik.touched.password && formik.errors.password ? 'is-invalid' : ''}`}
                    placeholder="Enter at least 8+ characters"
                    required
                  />
                  {formik.touched.password && formik.errors.password ? (
                    <div className="text-danger">{formik.errors.password}</div>
                  ) : null}
                  <div className="text-end mt-1">
                    <NavLink
                      to="/forgot-password"
                      className="text-danger"
                      style={{ fontSize: '0.85rem' }}
                    >
                      Forgot password?
                    </NavLink>
                  </div>
                </div>
                <div className="form-check mb-3">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="rememberMe"
                  />
                  <label className="form-check-label" htmlFor="rememberMe">
                    Remember me
                  </label>
                </div>
                <div className="d-grid mb-3">
                  <button type="submit" className="btn btn-warning text-white">
                    Sign in
                  </button>
                </div>
                <p className="text-center mb-2">Or sign in with</p>
                <div className="text-center">
                  <button className="btn btn-light btn-sm rounded-circle me-1">
                    <b style={{ color: 'red' }}>G</b>
                  </button>
                  <button className="btn btn-light btn-sm rounded-circle me-1">
                    <b style={{ color: '#3b5998' }}>f</b>
                  </button>
                  <button className="btn btn-light btn-sm rounded-circle">
                    <b style={{ color: 'gray' }}></b>
                  </button>
                </div>
              </form>
            </div>
            <div
              className="col-md-6"
              style={{
                backgroundColor: '#e6f9b8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
              }}
            >
              <img
                src={signin_leaf}
                alt="Leaf Character"
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;