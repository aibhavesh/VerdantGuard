import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import hackathon_leaf1 from "../../public/assets/images/hackathon_leaf1-removebg-preview.png";
import { API_URL_IMAGE } from "../constant/API_URL";

const UploadSchema = Yup.object({
  leafType: Yup.string().required("Please select a leaf type"),
  image: Yup.mixed().required("Please upload an image"),
});

const UploadLeafImage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const formik = useFormik({
    initialValues: {
      leafType: "",
      image: null,
    },
    validationSchema: UploadSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      setError(null);

      try {
        const formData = new FormData();
        formData.append("leafType", values.leafType);
        formData.append("image", values.image);

        const response = await axios.post(`${API_URL_IMAGE}/predict`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        setResult(response.data);
        console.log("Response:", response.data);
      } catch (err) {
        setError(err.response?.data?.message || "An error occurred during upload");
        console.error("Upload error:", err);
      } finally {
        setIsLoading(false);
      }
    },
  });

  const handleFileChange = (event) => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      formik.setFieldValue("image", event.currentTarget.files[0]);
    }
  };

  return (
    <section className="upload-section">
      <div className="container">
        <div className="row align-items-center justify-content-center">
          <div className="col-lg-6 mb-5 mb-lg-0">
            <div className="upload-card">
              <h4 className="mb-3 fw-bold text-success">Try Now - Upload Leaf Image.</h4>
              <p><strong>Begin Your Plant Health Check</strong></p>
              <p>
                Choose the type of leaf you'd like to test and upload an image to detect any possible disease.
                <br /><br />
                Our AI will analyze the leaf and provide instant results.
              </p>

              {result ? (
                <div className="alert alert-success">
                  <h5>🌿 Analysis Complete!</h5>
                  <pre className="bg-light p-3 rounded shadow-sm" style={{ fontSize: "0.85rem" }}>
                    {JSON.stringify(result, null, 2)}
                  </pre>
                </div>
              ) : (
                <form onSubmit={formik.handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="leafType" className="form-label fw-semibold">Select Leaf Type</label>
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
                    {formik.touched.leafType && formik.errors.leafType && (
                      <div className="text-danger">{formik.errors.leafType}</div>
                    )}
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-semibold">Upload Image</label>
                    <input
                      type="file"
                      className="form-control"
                      id="image"
                      name="image"
                      accept="image/*"
                      onChange={handleFileChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.image && formik.errors.image && (
                      <div className="text-danger">{formik.errors.image}</div>
                    )}
                  </div>
                  <div>
                    <small className="text-muted">Supported formats: JPG, PNG, JPEG</small>
                  </div>

                  <button type="submit" className="btn btn-yellow w-100 mt-3 shadow-sm" disabled={isLoading}>
                    {isLoading ? "Processing..." : "Submit for Detection"}
                  </button>
                </form>
              )}

              {error && <div className="alert alert-danger mt-3">{error}</div>}
            </div>
          </div>

          <div className="col-lg-6 text-center">
            <div className="side-quote">"Smart Leaf Health Detection at Your Fingertips."</div>
            <img src={hackathon_leaf1 || "/placeholder.svg"} className="leafy-img" alt="Leaf Character" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default UploadLeafImage;
