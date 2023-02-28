const mongoose = require("mongoose");
const { Schema } = mongoose;

const movieSchema = new Schema(
  {
    movieName: String,
    movieGenre: Array,
    plot: String,
    castDetails: Array,
    ratings: String,
    runTime: String,
    releaseDate: Date,
    lastShowDate: Date,
    posterName: String,
  },
  { timestamps: true }
);

const MovieModel = mongoose.model("MovieDetails", movieSchema);

module.exports = MovieModel;
