const express = require("express");
const router = express.Router();
const { registerUser } = require("../controllers/auth");

const registerRoute = router.post("/api/register", registerUser);

module.exports = { registerRoute };
