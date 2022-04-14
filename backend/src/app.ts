import express, { Express, Request, Response } from "express";
import cors from "cors";
import mongoose from "mongoose";
import path from "path";

const app: Express = express();

if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config();
}
const URI: string | any = process.env.MONGODB_DATABASE_URI;
mongoose
  .connect(URI)
  .then(() => {
    console.log("conntected success...!");
  })
  .catch((er: any) => {
    console.log(er.message);
  });

// use this on client
app.use(
  cors({
    credentials: true,
    origin: "/",
  })
);
app.use(express.json({ limit: `50mb` }));

app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// front-end
app.use("/", express.static(path.join(__dirname, "../../frontend/build")));
// front-end index file
app.get("*", (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
});

export default app;
