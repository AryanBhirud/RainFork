import express from "express";
import {
    addToCart,
    deleteCart,
    getAllUsers,
  getCart,
  getUser,
  increaseClicks,
  loginUser,
  logoutUser,
  registerUser,
  removeFromCart,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/").get(getAllUsers);
router.route("/cart").delete(isAuthenticatedUser, deleteCart).get(isAuthenticatedUser, getCart);
router.route("/cart/:productId").get(isAuthenticatedUser, addToCart).delete(isAuthenticatedUser, removeFromCart);
router.route("/products/:productId").get(isAuthenticatedUser, increaseClicks);
router.route("/:userId").get(getUser);

export default router;
