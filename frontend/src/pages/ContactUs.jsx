import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import  contactSchema  from '../schema/ContactSchema';
import { API_URL } from '../constant/API_URL';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../App.css';

const ContactUs = () => {
  const initialValues = {
    name: '',
    email: '',
    message: '',
  };

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(`${API_URL}/contactus`, values);
      if (response.data.success) {
        toast.success('Message sent successfully! We will get back to you soon.');
        resetForm();
      }
    } catch (error) {
      console.error('Error submitting contact form:', error);
      toast.error(error.response?.data?.error || 'Failed to send message. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container my-5">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="row g-5">
        {/* Left Section */}
        <div className="col-md-6 bg-white p-4 rounded shadow-sm">
          <h1 className="text-success">Contact Us</h1>
          <p>
            If you have any queries or feedback, feel free to reach out to us!
          </p>
          <div className="contact-info">
            <p>
              <strong>📍 Address:</strong> 123 GreenTech Street, AgriTown, India
            </p>
            <p>
              <strong>📞 Phone:</strong> ‪+91 98765 43210‬
            </p>
            <p>
              <strong>📧 Email:</strong> support@verdantguard.in
            </p>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6 bg-white p-4 rounded shadow-sm">
          <Formik
            initialValues={initialValues}
            validationSchema={contactSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting }) => (
              <Form>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label text-success">
                    Name
                  </label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                  />
                  <ErrorMessage name="name" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label text-success">
                    Email
                  </label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                  />
                  <ErrorMessage name="email" component="div" className="text-danger" />
                </div>
                <div className="mb-3">
                  <label htmlFor="message" className="form-label text-success">
                    Message
                  </label>
                  <Field
                    as="textarea"
                    id="message"
                    name="message"
                    rows="5"
                    className="form-control"
                  />
                  <ErrorMessage name="message" component="div" className="text-danger" />
                </div>
                <button type="submit" className="btn btn-success w-100" disabled={isSubmitting}>
                  {isSubmitting ? 'Submitting...' : 'Send Message'}
                </button>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
