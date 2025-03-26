import express from "express";
import { getLastWeekOrders, getLastMonthOrders, getLastYearOrders } from "../controllers/orderstats.controller";
import { verifyToken } from "../middlewares/verifyToken";


const router = express.Router();

router.get("/last-week", verifyToken, getLastWeekOrders);
router.get("/last-month", verifyToken, getLastMonthOrders);
router.get("/last-year", verifyToken, getLastYearOrders);

export default router;
