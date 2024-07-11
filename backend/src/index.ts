import express, { NextFunction, Request, Response, urlencoded } from "express";
import "dotenv/config";
import cors from "cors";
import { v2 as cloudinary } from "cloudinary";
import path from "path";
import mongoose from "mongoose";
import { logEvents, logger } from "./middleware/logger";
import cookieParser from "cookie-parser";
import { dbConn } from "./config/dbConn";
import { corsOptions } from "./config/corsOptions";
import usersRoutes from "./routes/users.route";
import authRoutes from "./routes/sessions.route";
import { deserializeUser } from "./middleware/deserializeUser";
import { errorHandler } from "./middleware/errorHandler";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const PORT = process.env.PORT || 7002;
const app = express();

dbConn();
app.use(logger);
app.use(express.json());
app.use(urlencoded({ extended: true }));
app.use(cors(corsOptions));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, "../../frontend/dist")));

app.use(deserializeUser);

app.use("/api/users", usersRoutes);
app.use("/api/auth", authRoutes);

app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/index.html"));
});

app.use(errorHandler);
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, async () => {
    console.log(`server running on localhost:${PORT}`);
  });
});

mongoose.connection.on("error", (err) => {
  logEvents(
    `${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`,
    "mongoErrLog.log"
  );
});
