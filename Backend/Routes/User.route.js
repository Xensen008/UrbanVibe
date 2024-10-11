import express from "express";
import { UserRegister, UserLogin } from "../Controllers/User.control.js";

const router = express.Router();

router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

export default router;

