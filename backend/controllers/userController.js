import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";
import User from "../models/userModel.js";
import sendToken from "../utils/jwttoken.js";
import ErrorHandler from "../utils/errorhandler.js";

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
