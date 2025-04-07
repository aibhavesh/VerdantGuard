// routes/uploadroutes.js
import express from "express";
import { SaveImage, GetImage } from "../controllers/UploadController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.post("/", upload.single("image"), SaveImage);
router.get("/", GetImage);

export default router;
