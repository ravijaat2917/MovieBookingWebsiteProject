const Artist = require('../models/artist.model'); // Assuming you have an Artist model

// Fetch all artists
exports.findAllArtists = async (req, res) => {
  try {
    const artists = await Artist.find();
    res.status(200).json(artists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
