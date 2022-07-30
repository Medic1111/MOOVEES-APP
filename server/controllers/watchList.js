const e = require("express");
const { User } = require("../models/models");

const postToWatch = (req, res) => {
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
};

const deleteFromWatch = (req, res) => {
  User.find({ _id: req.params.id }, async (err, doc) => {
    await doc[0].watched.filter((obj) => {
      return obj.imdbID !== req.params.movie;
    });
    await doc[0].save((err, succ) =>
      err
        ? res.status(500).json({ message: "Failed request" })
        : res.status(200).json({ message: "Removed" })
    );
  });
};

const moveToWatch = (req, res) => {
  User.find({ _id: req.params.id }, async (err, doc) => {
    let movieToPush = await doc[0].wish.filter((obj) => {
      return obj.imdbID === req.params.movie;
    });

    doc[0].wish = await doc[0].wish.filter((obj) => {
      return obj.imdbID !== req.params.movie;
    });
    await doc[0].watched.push(movieToPush[0]);
    await doc[0].save((err, succ) =>
      err
        ? res.status(500).json({ message: "Failed request" })
        : res.status(200).json({ message: "Moved to watched" })
    );
  });
};

module.exports = { postToWatch, deleteFromWatch, moveToWatch };
