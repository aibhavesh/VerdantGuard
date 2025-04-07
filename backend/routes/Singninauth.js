import express from 'express'
import SigninAuth  from '../controllers/Signinauthcontroller.js';
 
let routes = express.Router();

routes.post("/", SigninAuth);

export default routes;