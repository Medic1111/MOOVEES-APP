// REQUIRES
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const path = require("path");
require("dotenv").config();
const app = express();

// PERSONAL ROUTES:

const postMovieRoute = require("./routes/postMovieTitle");

// DB CONNECTION

mongoose.connect(`${process.env.DB_URI}`, (err) =>
  err ? console.log(err) : console.log("Connected to DB")
);

// MIDDLEWARES
app.use(cors({ origin: "*" }));
app.use(morgan("dev"));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, "../client/build")));

// PERSONAL MIDDLEWARES

app.use("/", postMovieRoute);

// UNHANDLED ROUTES
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// SERVER
app.listen(process.env.PORT || 3002, () => console.log("Server Spinning"));
