import React from 'react';
import '../../public/assets/bootstrap/css/bootstrap.css';
import '../App.css';
import hackathon_leaf1 from '../../public/assets/images/hackathon_leaf1-removebg-preview.png';
import { useFormik } from 'formik';
import UploadSchema from '../schema/UploadSchema';

const UploadLeafImage = () => {
  const formik = useFormik({
    initialValues: {
      leafType: '',
      image: null,
    },
    validationSchema: UploadSchema,
    onSubmit: (formData) => {
      console.log(formData);
      // Add actual submission logic here (e.g., API call)
    },
  });

  const handleFileChange = (event) => {
    formik.setFieldValue('image', event.target.files[0]);
  };

  return (
    <section className="upload-section">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          {/* Left: Upload Card */}
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="upload-card">
              <h4 className="mb-3 fw-bold text-success">Try Now - Upload Leaf Image.</h4>
              <p>
                <strong>Begin Your Plant Health Check</strong>
              </p>
              <p>
                Choose the type of leaf you'd like to test and upload an image to detect any possible disease.
                <br />
                <br />
                Our AI will analyze the leaf and provide instant results, personalized suggestions, and voice-based
                assistance.
              </p>

              <form onSubmit={formik.handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="leafType" className="form-label fw-semibold">
                    Select Leaf Type
                  </label>
                  <select
                    className="form-select"
                    id="leafType"
                    name="leafType"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.leafType}
                  >
                    <option value="">Select Leaf Type</option>
                    <option value="Potato">Potato</option>
                    <option value="Tomato">Tomato</option>
                    <option value="Wheat">Wheat</option>
                    <option value="Rice">Rice</option>
                  </select>
                  {formik.touched.leafType && formik.errors.leafType ? (
                    <div className="text-danger">{formik.errors.leafType}</div>
                  ) : null}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-semibold">Upload Image</label>
                  <input type="file" onChange={handleFileChange} />
                </div>

                <button type="submit" className="btn btn-yellow w-100 mt-3 shadow-sm">
                  Submit for Detection.
                </button>
              </form>
            </div>
          </div>

          {/* Right: Quote and Leaf Character */}
          <div className="col-lg-6 text-center">
            <div className="side-quote">“Smart Leaf Health Detection at Your Fingertips.”</div>
            <img src={hackathon_leaf1} className="leafy-img" alt="Leaf Character" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadLeafImage;
