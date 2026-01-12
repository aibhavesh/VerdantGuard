import express from "express";
let routes = express.Router();
import SignupRoutes from './SignupRoutes.js';
import SigninRoutes from './SigninRoutes.js';
import ContactusRoutes from './ContactusRoutes.js';
import SigninauthRoutes from './Singninauth.js';
import uploadRoutes from "./UploadRoutes.js";

routes.use("/api/v1/signin",SigninRoutes)
routes.use("/api/v1/signup",SignupRoutes)
routes.use("/api/v1/signinauth",SigninauthRoutes)
routes.use("/api/v1/contactus",ContactusRoutes)
routes.use(uploadRoutes);

export default routes;