require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const workoutRoutes = require("./routes/workouts");
const userRoutes = require("./routes/user")
const cors= require('cors')
const corsOptions = require('./config/corsOptions')

const app = express();

app.use(cors({
  origin: '*',  // Hardcode your frontend URL
  credentials: true
}));


app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutRoutes);

app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then((result) => {
    console.log("mongo connected");
    app.listen(process.env.PORT, () => console.log("listening"));
  })
  .catch((err) => {
    console.log(err);
  });
