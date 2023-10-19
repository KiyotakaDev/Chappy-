import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import { uploadPath } from "./utils/multerConfig.js";

const app = express();

app.set("port", 3000);
app.use(morgan("dev"));
app.use(
  cors({
    origin: "http://localhost:4000",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(uploadPath));

import authRoutes from "./routes/auth.routes.js";
import clientRoutes from "./routes/client.routes.js";
app.use("/api/auth", authRoutes);
app.use("/api/client", clientRoutes);

export default app;
