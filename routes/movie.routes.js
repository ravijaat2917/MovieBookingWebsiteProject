const express = require('express');
const router = express.Router();
const movieController = require('../controllers/movie.controller');

// Base URL: /api/movies
router.get("/", movieController.findAllMovies);
router.get("/:movieId", movieController.findOne);
router.get("/:movieId/shows", movieController.findShows);

module.exports = router;
