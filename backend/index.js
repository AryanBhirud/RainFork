import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()

const app = express();

app.use(express.json())
app.use(cors())

mongoose.connect("mongodb://localhost:27017/RainFork");

app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT ${process.env.PORT}`);
})