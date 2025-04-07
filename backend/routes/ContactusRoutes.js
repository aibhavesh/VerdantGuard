import express from "express";
let routes = express.Router();

import {FetchContact, SaveContact} from "../controllers/contactuscontroller.js";

routes.get("/",FetchContact);
routes.post("/", SaveContact);


export  default routes;