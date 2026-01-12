import express from "express";
import { SaveImage, GetImage } from "../controllers/UploadController.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

// Route for saving and predicting image
router.post("/api/v1/upload", upload.single("image"), SaveImage);

// Route for getting all uploaded images
router.get("/api/v1/images", GetImage);

export default router;
