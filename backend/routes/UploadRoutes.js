import express from "express";
import { SaveImage, GetImage, uploadFile } from "../controllers/UploadController.js";
import upload from "../middlewares/multer.js";
import { verifyUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for saving image without auth
router.post("/", upload.single("image"), SaveImage);

// Route for uploading file with authentication
router.post("/upload", verifyUser, upload.single("image"), uploadFile);

// Route for getting images
router.get("/", GetImage);

export default router;
