import { Router } from "express";
import {createOrder,getOrderById,getOrders,updateOrder,deleteOrder} from "../controllers/order.controller";
import { verifyToken } from "../middlewares/verifyToken";

const router = Router();

router.post("/",verifyToken, createOrder);
router.get("/", verifyToken,getOrders);
router.get("/:id",verifyToken, getOrderById);
router.put("/:id",verifyToken, updateOrder);
router.delete("/:id", verifyToken,deleteOrder);

export default router;
