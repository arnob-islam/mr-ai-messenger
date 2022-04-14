import express, { Express } from "express";
import cors from "cors";
import cookiePerser from "cookie-parser";
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

// use this on playground
app.use(cors());

// use this on client
app.use(
  cors({
    credentials: true,
    origin: "/",
  })
);

// // front-end
// app.use("/", express.static(path.join(__dirname, "../../frontend/build")));
// // front-end index file
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../../frontend/build/index.html"));
// });

app.use(express.json({ limit: `50mb` }));
app.use(cookiePerser());
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

export default app;
