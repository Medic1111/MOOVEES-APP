const axios = require("axios");

const getByTitle = (req, res) => {
  let title = req.body.userInput;

  let movieUrl = `https://www.omdbapi.com/?apikey=${process.env.MOVIE_KEY_API}=${title}`;

  axios
    .get(movieUrl)
    .then((apiRes) => {
      console.log(apiRes.data.Search.imdbID);
      apiRes.data.Search !== undefined
        ? res.status(200).json(apiRes.data.Search)
        : res.status(404).json({ message: "Entry not found" });
    })
    .catch((err) =>
      res.status(500).json({ message: "Server Side Error, Booh" })
    );
};

module.exports = { getByTitle };
