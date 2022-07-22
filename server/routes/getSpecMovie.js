const express = require("express");
const router = express.Router();
const { getMovie } = require("../controllers/getSpecMovie");

router.get("/api/movie/:id", getMovie);

module.exports = router;
