import express from "express";
import { createProduct, getAllProducts, getAllProductsbyCategory, getProduct } from "../controllers/productController.js";

const router = express.Router();

router.route("/new").post(createProduct);
router.route("/").get(getAllProducts);
router.route("/:productId").get(getProduct);
router.route("/category/:category").get(getAllProductsbyCategory);


export default router;