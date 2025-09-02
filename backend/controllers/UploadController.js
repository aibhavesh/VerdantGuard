// controllers/UploadController.js
import axios from "axios";
import fs from "fs";
import FormData from "form-data";
import image from "../models/UploadSchema.js";

const FLASK_API_URL = process.env.FLASK_API_URL || "http://localhost:5000/predict";

const SaveImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file uploaded." });

    const { leafType } = req.body;
    if (!leafType) return res.status(400).json({ message: "Leaf type is required." });

    if (!FLASK_API_URL) {
      console.error("FLASK_API_URL not set in environment");
      return res.status(500).json({ message: "Server misconfiguration" });
    }

    const formData = new FormData();
    formData.append("image", fs.createReadStream(req.file.path));
    formData.append("leafType", leafType);

    let flaskResponse;
    let attempt = 0;
    const maxAttempts = 3;
    const baseTimeout = 5000;
    while (attempt < maxAttempts) {
      try {
        flaskResponse = await axios.post(FLASK_API_URL, formData, {
          headers: formData.getHeaders(),
          timeout: baseTimeout * Math.pow(2, attempt),
        });
        break;
      } catch (err) {
        attempt++;
        if (attempt >= maxAttempts) {
          console.error("Flask API call failed after retries:", err);
          throw err;
        }
        await new Promise(r => setTimeout(r, 500 * Math.pow(2, attempt)));
      }
    }

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
      message: "Error processing image"
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
