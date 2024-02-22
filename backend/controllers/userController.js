import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwttoken.js";
import ErrorHandler from "../utils/errorhandler.js";
import Product from "../models/productModel.js";

export const registerUser = catchAsyncErrors(async (req, res) => {
  const { username, email, password, phoneNumber } = req.body;
  const user = await User.create({
    username,
    email,
    password,
    phoneNumber,
  });
  sendToken(user, 201, res);
});

export const loginUser = catchAsyncErrors(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  if (user.password !== password) {
    return next(new ErrorHandler("Invalid username or password", 401));
  }

  sendToken(user, 200, res);
});

export const logoutUser = catchAsyncErrors(async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

export const getAllUsers = catchAsyncErrors(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

export const getUser = catchAsyncErrors(async (req, res) => {
  const userId = req.params.userId;
  const user = await User.findById(userId);
  res.status(200).json(user);
});

export const increaseClicks = catchAsyncErrors(async (req, res) => {
  const productId = req.params.productId;
  const user = req.user;
  let present = false;
  user.clicks.forEach((click) => {
    if (click.productId == productId) {
      click.count += 1;
      present = true;
    }
  });
  if (!present) {
    user.clicks.push({ productId, count: 1 });
  }

  await user.save();

  res.status(200).json(user);
});

export const addToCart = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  const productId = req.params.productId;

  user.cart.push(productId);
  await user.save();

  res.status(200).json(user);
});

export const removeFromCart = catchAsyncErrors(async (req, res) => {
  const userId = req.user.id;
  const productId = req.params.productId;
  const user = await User.findByIdAndUpdate(
    userId,
    {
      $pull: {
        cart: productId,
      },
    },
    { new: true }
  );
  res.status(200).json(user);
});

export const deleteCart = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  user.cart = [];
  await user.save();
  res.status(200).json(user);
});

export const getCart = catchAsyncErrors(async (req, res) => {
  const user = req.user;
  res.status(200).json({
    cart: user.cart,
  });
});
