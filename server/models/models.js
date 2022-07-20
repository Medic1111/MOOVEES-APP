const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  email: { type: String, required: true },
  wish: { type: Array, default: [] },
  watched: { type: Array, default: [] },
});

const User = new mongoose.model("User", userSchema);

module.exports = { User };
