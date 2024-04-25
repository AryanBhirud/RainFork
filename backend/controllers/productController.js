import User from "../models/userModel.js";
import Product from "../models/productModel.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

export const createProduct = catchAsyncErrors(async (req, res) => {
  const product = await Product.create(req.body);
  res.status(200).json(product);
});

export const getProduct = catchAsyncErrors(async (req, res) => {
  const productId = req.params.productId;
  const product = await Product.findById(productId);
  res.status(200).json(product);
});

export const getAllProducts = catchAsyncErrors(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

export const getAllProductsbyCategory = catchAsyncErrors(async (req, res) => {
    const products = await Product.find({category: {$in: [req.params.category]}});
    res.status(200).json(products);
})