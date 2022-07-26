const { User } = require("../models/models");
const bcrypt = require("bcrypt");
const saltRounds = 10;

const registerUser = (req, res) => {
  if (
    req.body.password === "" ||
    req.body.username === "" ||
    req.body.email === ""
  ) {
    res.status(400).json({ message: "Incomplete required fields" });
  } else {
    User.find({ email: req.body.email }, (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Oops, something went wrong." });
      } else {
        if (doc.length !== 0) {
          res.status(409).json({ message: "Email Already Registered" });
        } else {
          bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
            if (err) {
              console.log(err);
            } else {
              const newUser = new User({
                username: req.body.username,
                password: hash,
                email: req.body.email,
              });
              await newUser.save((err, succ) =>
                err
                  ? res
                      .status(500)
                      .json({ message: "Server error, oops. Try again." })
                  : res.status(200).json(succ)
              );
            }
          });
        }
      }
    });
  }
};

const login = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    res.status(400).json({ message: "All fields are required" });
  } else {
    User.find({ username: username }, (err, doc) => {
      if (err) {
        res.status(500).json({ message: "Server error. Oops, try again." });
      } else {
        if (doc.length === 0) {
          res.status(404).json({ message: "Not registered" });
        } else {
          bcrypt.compare(password, doc[0].password, (err, match) => {
            match
              ? res.status(200).json(doc)
              : res.status(401).json({ message: "Not auth" });
          });
        }
      }
    });
  }
};

module.exports = { registerUser, login };
