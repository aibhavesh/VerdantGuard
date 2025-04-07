// controllers/UploadController.js
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import image from "../models/UploadSchema.js";

const FLASK_API_URL = "http://127.0.0.1:5000/predict";

const SaveImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const { leafType } = req.body;
    if (!leafType) return res.status(400).json({ message: "Leaf type is required." });

    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));
    formData.append("leafType", leafType);

    const flaskResponse = await axios.post(FLASK_API_URL, formData, {
      headers: formData.getHeaders(),
    });

    const newImage = new image({
      leafType,
      imagePath: req.file.path,
      result: flaskResponse.data,
    });

    await newImage.save();

    res.status(200).json({
      message: "Image processed successfully",
      file: req.file,
      prediction: flaskResponse.data,
    });
  } catch (error) {
    console.error("Error processing image:", error);
    res.status(500).json({
      message: "Error processing image",
      error: error.message,
    });
  }
};

const GetImage = async (req, res) => {
  try {
    const result = await image.find();
    res.status(200).json(result);
  } catch (error) {
    console.error("Error fetching images:", error);
    res.status(500).json({
      message: "Error fetching images",
      error: error.message,
    });
  }
};

export { SaveImage, GetImage };
