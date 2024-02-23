import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config();

import UserRouter from "./routes/userRoute.js";
import ProductRouter from "./routes/productRoute.js";

mongoose.connect(`${process.env.DB_URI}`);

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin || origin === 'http://localhost:5173') {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};


const app = express();

app.use(express.json());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/api/v1/users", UserRouter);
app.use("/api/v1/products", ProductRouter);

app.listen(process.env.PORT, () => {
  console.log(`Server is running at PORT ${process.env.PORT}`);
});
