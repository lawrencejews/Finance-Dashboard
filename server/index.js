import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";

import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";

import KPI from "./models/KPI.js";
import Product from "./models/Product.js";
import Transaction from "./models/Transaction.js";

import { kpis, products, transactions } from "./data/data.js";

// Configurations: helmet for security threats, 
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({
  policy: "cross-origin"
}));

// middleware to log HTTPS requests, errors and simplifies the process.
app.use(morgan("common"))

// Processes data in an HTTP request body: JSON, TEXT, URL-encoded.
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}));

// Enables communicate between the frontend and backend on the same origin.
app.use(cors());

// Routes 
app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes)

// Mongoose Setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => console.log(`Backend server started on port : ${PORT}`));

    /* Add Data As Needed */
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));