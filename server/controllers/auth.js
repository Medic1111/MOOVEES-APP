const { User } = require("../models/models");

const registerUser = async (req, res) => {
  const newUser = new User(req.body, (err, doc) =>
    err ? console.log(err) : console.log(doc)
  );

  await newUser.save();
};

module.exports = { registerUser };
