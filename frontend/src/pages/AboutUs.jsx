import React from 'react';
import '../../public/assets/bootstrap/css/bootstrap.css';
import '../App.css';

const AboutUs = () => {
  return (
    <section className="section text-center">
      <div className="container">
        <h1>About Us</h1>
        <p className="lead">
          <span className="highlight">VerdantGuard</span> – AI for Leaf Health,<br />
          Power to Farmers
        </p>

        <div className="card-custom text-start mt-4">
          <p>
            <strong className="highlight">VerdantGuard</strong> is an AI-powered leaf disease detection system designed to empower farmers with timely, accurate, and accessible plant health diagnostics. Our mission is simple yet impactful — to Diagnose Early, Act Wisely, and Protect Crops for a sustainable agricultural future.
          </p>
          <p className="mt-3">We believe that technology shouldn’t be a luxury, but a lifeline for every farmer — and that's what drives us.</p>
        </div>

        <div className="card-custom text-start">
          <h5><span className="icon">💡</span>Our Vision</h5>
          <p className="mt-2">To make precision farming tools accessible to every farmer, helping them combat plant diseases, increase crop yield, and reduce environmental damage through early detection and smart intervention.</p>
        </div>

        <div className="card-custom text-start">
          <h5><span className="icon">🚀</span>Why <span className="highlight">VerdantGuard</span>?</h5>
          <ul className="mt-2 mb-0">
            <li>Combines AI with regional inclusivity.</li>
            <li>Supports voice-based output and multilingual UI.</li>
            <li>Accessible on low-end devices and internet-constrained zones.</li>
          </ul>
        </div>

        <div className="card-custom text-start">
          <p>Together, we're not just building a tool.<br />
          We’re crafting a solution to transform lives.<br />
          Because healthy crops mean healthy communities.</p>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
