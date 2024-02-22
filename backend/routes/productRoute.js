import express from "express";
import { createProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/new").post(createProduct);

export default router;