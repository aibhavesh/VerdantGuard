import express from "express";
let routes = express.Router();
import multer from "multer"

const upload = multer({ dest: "../uploads" }); // Save uploaded files to 'uploads/' directory
routes.post("/upload", );



export  default routes;