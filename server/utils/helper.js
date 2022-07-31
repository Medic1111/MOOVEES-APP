const movieTitle = "Orange Is the New Black";
const movieId = "tt2372162";
const getByPostTitleRoute = `/api/movies/title`;
const getByIdRoute = `/api/movie/${movieId}`;
const userId = "62db1a38973e46998a8018b6";

const movieObj = {
  Title: "Orange Is the New Black",
  Year: "2013–2019",
  imdbID: "tt2372162",
  Type: "series",
  Poster:
    "https://m.media-amazon.com/images/M/MV5BYjYyM2FmMmMtZDgyZi00NGU3LWI3NzktODllZDY0YzQyNzgyXkEyXkFqcGdeQXVyMTkxNjUyNQ@@._V1_SX300.jpg",
};

module.exports = {
  movieTitle,
  getByIdRoute,
  getByPostTitleRoute,
  userId,
  movieId,
  movieObj,
};
