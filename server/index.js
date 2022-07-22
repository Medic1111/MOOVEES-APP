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
const { registerRoute, loginRoute } = require("./routes/auth");
const getSpecMovieRoute = require("./routes/getSpecMovie");

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
app.use("/", loginRoute);
app.use("/", getSpecMovieRoute);

// CURRENT:

app.post("/api/:id/watched", (req, res) => {
  let id = req.params.id;
  let newMovie = req.body;

  User.find({ _id: id }, async (err, doc) => {
    await doc[0].watched.push(newMovie);

    await doc[0].save((err, entry) => {
      err
        ? res.status(500).json({ message: "Server error, oops try again" })
        : res.status(200).json(entry.watched);
    });
  });
});

app.post("/api/:id/wish", (req, res) => {
  let id = req.params.id;
  let newMovie = req.body;

  User.find({ _id: id }, async (err, doc) => {
    await doc[0].wish.push(newMovie);

    await doc[0].save((err, entry) => {
      err
        ? res.status(500).json({ message: "Server error, oops try again" })
        : res.status(200).json(entry.wish);
    });
  });
});

// DELETE FROM WISH

app.patch("/api/:id/wishlist/remove/:movie", (req, res) => {
  User.find({ _id: req.params.id }, async (err, doc) => {
    doc[0].wish = await doc[0].wish.filter((obj) => {
      return obj.imdbID !== req.params.movie;
    });
    await doc[0].save((err, succ) =>
      err
        ? res.status(500).json({ message: "Failed request" })
        : res.status(200).json({ message: "Removed" })
    );
  });
});

// DELETE FROM WATCHED

app.patch("/api/:id/watched/remove/:movie", (req, res) => {
  User.find({ _id: req.params.id }, async (err, doc) => {
    doc[0].watched = await doc[0].watched.filter((obj) => {
      return obj.imdbID !== req.params.movie;
    });
    await doc[0].save((err, succ) =>
      err
        ? res.status(500).json({ message: "Failed request" })
        : res.status(200).json({ message: "Removed" })
    );
  });
});

// MOVE TO WATCHED
app.patch("/api/:id/wishlist/watched/:movie", (req, res) => {
  User.find({ _id: req.params.id }, async (err, doc) => {
    let movieToPush = (doc[0].wish = await doc[0].wish.filter((obj) => {
      return obj.imdbID === req.params.movie;
    }));

    doc[0].wish = await doc[0].wish.filter((obj) => {
      return obj.imdbID !== req.params.movie;
    });

    await doc[0].watched.push(movieToPush[0]);

    await doc[0].save((err, succ) =>
      err
        ? res.status(500).json({ message: "Failed request" })
        : res.status(200).json({ message: "Removed" })
    );
  });
});

// UNHANDLED ROUTES
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build", "index.html"));
});

// SERVER
app.listen(process.env.PORT || 3002, () => console.log("Server Spinning"));
