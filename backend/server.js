require("dotenv").config();

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const workoutRoutes = require("./routes/workoutRoutes");
const userRoutes = require("./routes/authroutes");

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(result => {
    app.listen(process.env.PORT);
    console.log("DB is connected!.");
  })
  .catch(err => console.log(err));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/workouts", workoutRoutes);
app.use("/api/user", userRoutes);
