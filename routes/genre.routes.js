const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genre.controller');

// Base URL: /api/genres
router.get("/", genreController.findAllGenres);

module.exports = router;
