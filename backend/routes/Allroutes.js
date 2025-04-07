import express from "express";
let routes = express.Router();
import SignupRoutes from './SignupRoutes.js';
import UploadRoutes from './UploadRoutes.js';
import SigninRoutes from './SigninRoutes.js';
import ContactusRoutes from './ContactusRoutes.js';
import SigninauthRoutes from './Singninauth.js';

routes.use("/api/v1/signin",SigninRoutes)
routes.use("/api/v1/signup",SignupRoutes)
routes.use("/api/v1/upload",UploadRoutes)
routes.use("/api/v1/signinauth",SigninauthRoutes)
routes.use("/api/v1/contactus",ContactusRoutes)



export default routes;