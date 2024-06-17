const express = require("express");
const mongoose = require("mongoose");
const cors = require('cors');
const workoutroutes = require("./routes/workouts.js");
const userRoutes = require("./routes/user.js");
const PORT = process.env.PORT || 4000
require("dotenv").config();
const app = express();

app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

const corsOptions = {
  origin: "http://workout-application-rust.vercel.app",
  optionsSuccessStatus: 200,
  credentials: true,
};
// app.options('*', cors(corsOptions));
app.use(cors(corsOptions));

app.use("/api/workouts", workoutroutes);
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONG_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log("connected to mongodb and listening at port");
    });
  })
  .catch((err) => {
    console.log(err);
  });
