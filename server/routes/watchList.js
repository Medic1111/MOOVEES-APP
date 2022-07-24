const express = require("express");
const {
  postToWatch,
  deleteFromWatch,
  moveToWatch,
} = require("../controllers/watchList");
const router = express.Router();

const postToWatchRoute = router.post("/api/:id/watched", postToWatch);
const deleteFromWatchRoute = router.patch(
  "/api/:id/watched/remove/:movie",
  deleteFromWatch
);
const moveToWatchRoute = router.patch(
  "/api/:id/wishlist/watched/:movie",
  moveToWatch
);

module.exports = { postToWatchRoute, deleteFromWatchRoute, moveToWatchRoute };
