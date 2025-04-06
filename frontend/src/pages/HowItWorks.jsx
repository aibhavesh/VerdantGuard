import React from 'react';
import '../../public/assets/bootstrap/css/bootstrap.css';
import '../App.css';
import stepFlowImage from '../../public/assets/images/🌿 How It Works — From Leaf to Lifeline - visual selection (1).png';
const HowItWorks = () => {
  return (
    <div className="how-it-works-container text-center">
      <h1>How It Works ?</h1>
      <p className="lead">Achieving Plant Health with VerdantGuard</p>

      <div className="step-flow-img">
        <img src={stepFlowImage} alt="Step Flow" className="img-fluid" />
      </div>
    </div>
  );
};

export default HowItWorks;
