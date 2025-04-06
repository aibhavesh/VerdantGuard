import React from "react";
import { Routes,Route } from "react-router-dom";
import AboutUs from '../pages/AboutUs';
import H from '../pages/HeroSection';
import HowItWorks from '../pages/HowItWorks';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import UploadLeafImage from '../pages/Upload';
const AllRoutes = () => {
    return (
    <Routes>
        <Route path="" element={<H/>} />
        <Route path="about" element={<AboutUs />} />
        <Route path="howitworks" element={<HowItWorks />} />
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="upload" element={<UploadLeafImage />} />
    </Routes>
    );
};

export default AllRoutes;