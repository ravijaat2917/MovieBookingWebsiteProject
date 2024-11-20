const Movie = require('../models/movie.model'); // Assuming you have a Movie model

// Fetch movies by status
exports.findAllMovies = async (req, res) => {
  const { status } = req.query;
  try {
    const movies = status ? await Movie.find({ status }) : await Movie.find();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch details of a movie by ID
exports.findOne = async (req, res) => {
  try {
    const movie = await Movie.findOne({ movieid: req.params.movieId });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Fetch shows of a specific movie by ID
exports.findShows = async (req, res) => {
  try {
    const movie = await Movie.findOne({ movieid: req.params.movieId });
    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }
    res.status(200).json(movie.shows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
