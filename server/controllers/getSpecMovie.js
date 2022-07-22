const axios = require("axios");

const getMovie = async (req, res) => {
  let id = req.params.id;
  let url = `https://www.omdbapi.com/?apikey=${process.env.MOVIE_KEY_API}&i=${id}`;
  await axios
    .get(url)
    .then((apiRes) => {
      let resObj = {
        Title: apiRes.data.Title,
        Year: apiRes.data.Year,
        Runtime: apiRes.data.Runtime,
        Actors: apiRes.data.Actors,
        Director: apiRes.data.Director,
        Plot: apiRes.data.Plot,
        Poster: apiRes.data.Poster,
      };
      res.status(200).json(resObj);
    })
    .catch((err) =>
      res
        .status(500)
        .json({ message: "Oops, something went wrong. Please try again." })
    );
};

module.exports = { getMovie };
