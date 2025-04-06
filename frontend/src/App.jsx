import React from 'react';
import '../public/assets/bootstrap/css/bootstrap.css';
import './App.css';
import AllRoutes from './routes/AllRoutes';
import Navbar from './components/Navbar';
import HeroSection from './pages/HeroSection'
import Footer from './components/Footer';
const App = () => {
  return (
    <div className="app">
      <Navbar />
      <HeroSection />
      <AllRoutes />
      <Footer/>
    </div>
  );
};

export default App
