const { User } = require("../models/models");

const addToWish = (req, res) => {
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
};

const delFromWish = (req, res) => {
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
};

module.exports = { addToWish, delFromWish };
