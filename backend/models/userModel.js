import mongoose from "mongoose";
import jwt from "jsonwebtoken";

const productCountSchema = new mongoose.Schema({
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Reference to the Product model
      required: true
    },
    count: {
      type: Number,
      default: 0
    }
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "please enter username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number"],
  },
  role: {
    type: String,
    default: "user",
  },
  cart: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],
  clicks: [productCountSchema],
});

userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

const User = mongoose.model("User", userSchema);

export default User;
