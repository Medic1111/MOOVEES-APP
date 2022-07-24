const express = require("express");
const router = express.Router();
const { addToWish, delFromWish } = require("../controllers/wishList");

const addToWishRoute = router.post("/api/:id/wish", addToWish);
const delFromWishRoute = router.patch(
  "/api/:id/wishlist/remove/:movie",
  delFromWish
);

module.exports = { addToWishRoute, delFromWishRoute };
