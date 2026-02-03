// server/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import analyticsRoutes from "./routes/analyticsRoutes.js";

dotenv.config();

const app = express();

// Middleware
app.use(
  cors({
    origin: "*", // in production, restrict to Netlify URL
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use(express.json());

// DB connection
connectDB();

// Health check
app.get("/", (_req, res) => {
  res.json({ message: "Eatoes API is running" });
});

// Routes
app.use("/api/menu", menuRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/analytics", analyticsRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
