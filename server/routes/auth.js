const express = require("express");
const router = express.Router();
const { registerUser, login } = require("../controllers/auth");

const registerRoute = router.post("/api/register", registerUser);

const loginRoute = router.post("/api/login", login);

module.exports = { registerRoute, loginRoute };
