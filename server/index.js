// REQUIRES
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const axios = require("axios");
const path = require("path");
const { User } = require("./models/models");
require("dotenv").config();
const app = express();

// PERSONAL ROUTES:

const postMovieRoute = require("./routes/postMovieTitle");
const { registerRoute } = require("./routes/auth");

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
app.use("/", registerRoute);

// CURRENT:

app.get("/api/movie/:id", async (req, res) => {
  let id = req.params.id;
  let url = `https://www.omdbapi.com/?apikey=${process.env.MOVIE_KEY_API}&i=${id}`;
  await axios
    .get(url)
    .then((apiRes) => {
      let resObj = {
        Title: apiRes.data.Title,
        Year: apiRes.data.Year,
        Runtime: apiRes.data.Runtime,
        Actors: apiRes.data.Actors,
        Director: apiRes.data.Director,
        Plot: apiRes.data.Plot,
        Poster: apiRes.data.Poster,
      };
      res.status(200).json(resObj);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Oops, something went wrong. Please try again." })
    );
});

// UNHANDLED ROUTES
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// SERVER
app.listen(process.env.PORT || 3002, () => console.log("Server Spinning"));
