import express from "express";
import {
    getAllUsers,
  getUser,
  increaseClicks,
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/userController.js";
import { isAuthenticatedUser } from "../middlewares/auth.js";

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").get(logoutUser);
router.route("/").get(getAllUsers);
router.route("/:userId").get(getUser);
router.route("/products/:productId").get(isAuthenticatedUser, increaseClicks);

export default router;
