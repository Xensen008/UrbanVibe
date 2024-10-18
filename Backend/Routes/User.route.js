import express from "express";
import {
  UserRegister,
  UserLogin,
  addToCart,
  addToFavourite, 
  cancelOrder,
  getAllCartItems,
  getAllOrders,
  getUserFavourite, 
  placeOrder,
  removeFromCart,
  markOrderAsDelivered,
  removeFromFavourite, 
} from "../Controllers/User.control.js";
import { verifyToken } from "../Middleware/verifyToken.js";
const router = express.Router();
//Auth
router.post("/signup",  UserRegister);
router.post("/signin", UserLogin);

//cart
router.get("/cart", verifyToken, getAllCartItems);
router.post("/cart", verifyToken, addToCart);
router.patch("/cart", verifyToken, removeFromCart);

//order
router.get("/order", verifyToken, getAllOrders);
router.post("/order", verifyToken, placeOrder);
router.patch("/order/cancel", verifyToken, cancelOrder);
router.patch("/order/deliver", verifyToken, markOrderAsDelivered);

//favourites
router.get("/favorite", verifyToken, getUserFavourite);
router.post("/favorite", verifyToken, addToFavourite);
router.patch("/favorite", verifyToken, removeFromFavourite);


export default router;