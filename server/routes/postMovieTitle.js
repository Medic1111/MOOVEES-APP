const express = require("express");
const router = express.Router();
const { getByTitle } = require("../controllers/postMovieTitle");

router.post("/api/movies/title", getByTitle);

module.exports = router;
