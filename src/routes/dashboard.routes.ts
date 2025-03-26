import express from "express";
import { getDashboardMetrics } from "../controllers/dashboard.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = express.Router();

router.get("/metrics", verifyToken, getDashboardMetrics);

export default router;
