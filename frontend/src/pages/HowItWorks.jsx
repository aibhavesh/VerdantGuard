import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Bootstrap CSS
import '../App.css'; // Custom styles


const HowItWorks = () => {
  return (
    <div className="how-it-works-container text-center my-5">
      <h1 className="mb-3">How It Works ?</h1>
      <p className="lead mb-4">Achieving Plant Health with VerdantGuard</p>

      <div className="step-flow-img">
        <img src="/assets/images/Selection (1).png" alt="Step Flow" className="doubled-image img-fluid" />
      </div>
    </div>
  );
};

export default HowItWorks;
