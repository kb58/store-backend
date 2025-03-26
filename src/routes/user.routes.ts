import express from "express"
import { getUser,loginUser,registerUser,logoutUser } from "../controllers/user.controller";
import { verifyToken } from "../middlewares/verifyToken";
import { verifyRole } from "../middlewares/verifyRole";
import { createUser } from "../controllers/user.controller";

const router=express.Router()


router.get("/:username",getUser);
router.post("/auth/register",registerUser);
router.post("/auth/login",loginUser);
router.post("/auth/logout",logoutUser);
router.post('/users', verifyToken, verifyRole('manager'), createUser);


export default router;