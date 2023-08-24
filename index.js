import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoute from "./routes/users.js";
import JobsRoute from "./routes/jobs.js";

const app = express();

dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(
  cors({
    origin: ["http://localhost:3000/", "https://jobhub-mern-app.onrender.com"],
  })
);

app.use("/account", userRoute);
app.use("/jobs", JobsRoute);

app.get("/", (req, res) => {
  res.send("App is Running");
});

mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server Running on port :${5000}`)
    )
  )
  .catch((error) => console.log(error.message));
