import express from "express";
import { json } from "body-parser";
import cors from "cors";
import userRoutes from "./routes/userRoutes";
import authRoutes from "./routes/authRoutes";
import { authenticate } from "./middleware/authMiddleware";

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(cors({ origin: "http://localhost:3000" }));
app.use(json());

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes); // Protect user routes

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
