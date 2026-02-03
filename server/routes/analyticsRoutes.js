// server/routes/analyticsRoutes.js
import express from "express";
import { topSellingItems } from "../controllers/analyticsController.js";

const router = express.Router();

router.get("/top-items", topSellingItems);

export default router;
