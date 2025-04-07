// server.js
import express from 'express';
import allRoutes from './routes/Allroutes.js';
import cors from 'cors';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads")); // serve uploaded images
app.use(allRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Server Running on port", port);
});
