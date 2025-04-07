import express from "express";
let routes = express.Router();
import {Fetchuser,FetchuserById,Saveuser,Updateuser,Deleteuser} from "../controllers/SignUpController.js";
// import {Fetchuser,FetchuserById,Saveuser,Updateuser,Deleteuser} from "../controllers/SignUpController.js";  

routes.get("/",Fetchuser);
routes.get("/:id",FetchuserById);
routes.post("/", Saveuser);
routes.put("/:id", Updateuser);
routes.delete("/:id", Deleteuser);

export  default routes;