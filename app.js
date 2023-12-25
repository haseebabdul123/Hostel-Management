import express from "express";
import cors from "cors";
import userRoutes from "./routes/userRoutes.js";
import bodyParser from "body-parser";
const app = express();
import dotenv from "dotenv";
import connectDB from "./config/connectdb.js";

const DATABASE_URL =
  process.env.DATABASE_URL || "mongodb://localhost:27017/hostel-management";

dotenv.config();

const port = process.env.PORT || "8000";

app.use(cors());

connectDB(DATABASE_URL);

app.use("/api/v1/user", bodyParser.json(), userRoutes);

app.use(express.json());

app.listen(port, () => {
  console.log(`App is Running at http://localhost:${port}`);
});
