import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose"; // Added mongoose here for easier tracking
import { connectDB } from "./config/db.js";
import projectRoutes from "./routes/projectRoutes.js";
import messageRoutes from "./routes/messageRoutes.js";
import { notFound, errorHandler } from "./middleware/errorHandler.js";

// 1. Load Environment Variables
dotenv.config();

const app = express();

// 2. Middleware

app.use(cors());
app.use(express.json());

// 3. Simple Test Route
app.get("/", (req, res) => {
  res.json({ success: true, message: "Portfolio backend is running." });
});

// 4. API Routes
app.use("/api/projects", projectRoutes);
app.use("/api/messages", messageRoutes);

// 5. Error Handling Middleware
app.use(notFound);
app.use(errorHandler);

// 6. Database Connection and Server Start
const PORT = process.env.PORT || 5000;

// const PORT = process.env.PORT || 8080; // AWS often uses 8080
const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error("ERROR: Missing MONGODB_URI in .env file.");
  process.exit(1);
}

// Connect to MongoDB
console.log("⏳ Attempting to connect to MongoDB...");

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("MongoDB Connected Successfully!");
    // Only start the server if the database connects
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:");
    console.error(err.message);
    console.log("\nTIP: Make sure your IP is allowed in MongoDB Atlas (Network Access -> 0.0.0.0/0)");
    process.exit(1);
  });