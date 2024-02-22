import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: [true, "Please provide a product name"],
    },
    description: {
        type: String,
        required: [true, "Please provide a brief decription"],
    },
    stock: {
        type: String,
        default: "InStock",
    },
    brand: {
        type: String,
        required: [true, "Please provide a brand name"],
    },
    price: {
        type: String,
        required: [true,"Please provide a product price"],
    },
    baseImageUrl: {
        type: String,
        required: [true, "Please provide a base image"],
    },
    rating: {
        type: Number,
        default: 0
    },
    images: [
        {
            type: String,
        }
    ],
    category: {
        type: String,
        required: [true, "Please enter a category"],
    },
})

const productModel = mongoose.model("Product", productSchema);
