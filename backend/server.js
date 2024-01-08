require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const workoutroutes = require("./routes/workouts.js");
const userRoutes = require("./routes/user.js");

const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

app.use("/api/workouts", workoutroutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen( process.env.PORT, () => {
      console.log("connected to mongodb and listening at port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
