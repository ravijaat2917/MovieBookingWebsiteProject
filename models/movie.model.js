const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  movieid: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  published: { type: Boolean, required: true },
  released: { type: Boolean, required: true },
  poster_url: { type: String, required: true },
  release_date: { type: Date, required: true },
  publish_date: { type: Date, required: true },
  artists: [
    {
      artistid: { type: Number, required: true },
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      wiki_url: { type: String },
      profile_url: { type: String },
    },
  ],
  genres: [{ type: String }], // Array of genre strings
  duration: { type: Number, required: true },
  critic_rating: { type: Number, min: 1, max: 5 },
  trailer_url: { type: String },
  wiki_url: { type: String },
  story_line: { type: String },
  shows: [
    {
      id: { type: Number, required: true },
      theatre: {
        name: { type: String, required: true },
        city: { type: String, required: true },
      },
      language: { type: String, required: true },
      show_timing: { type: Date, required: true },
      available_seats: { type: Number, required: true },
      unit_price: { type: Number, required: true },
    },
  ],
});

module.exports = mongoose.model("Movie", movieSchema);
