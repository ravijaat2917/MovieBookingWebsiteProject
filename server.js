// Load required modules
const express = require("express");
const cors = require("cors");
const movieRoutes = require("./routes/movie.routes");
const artistRoutes = require("./routes/artist.routes");
const genreRoutes = require("./routes/genre.routes");
const userRoutes = require("./routes/user.routes");

const userRoutes = require("./routes/userRoutes");

// Use Routes

// Create Express app object
const app = express();

// Enable CORS
app.use(cors());

app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Upgrad Movie booking application development.",
    });
});
app.use("/api/auth", userRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/artists", artistRoutes);
app.use("/api/genres", genreRoutes);

// Set PORT and start server
const PORT = 8085;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
