const mongoose = require("mongoose");
const { Schema } = mongoose;

const theatreSchema = new Schema(
  {
    theatreName: String,
    screenCount: Number,
    screenId: Number,
    screenName: String,
    movieId: Object,
    tickets: String,
    ticketAmount: String,
    isCancellationAvailable: String,
    location: String,
  },
  { timestamps: true }
);

const TheatreModel = mongoose.model("TheatreDetails", theatreSchema);

module.exports = TheatreModel;
