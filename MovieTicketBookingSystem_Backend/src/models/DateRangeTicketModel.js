const mongoose = require("mongoose");
const { Schema } = mongoose;

const dateRangeTicketSchema = new Schema(
  {
    theatreId: String,
    movieId: String,
    movieDate: String,
    movieTiming: String,
    ticketCount: Number,
  },
  { timestamps: true }
);

const DateRangeTicketsModel = mongoose.model(
  "DateRangeTickets",
  dateRangeTicketSchema
);

module.exports = DateRangeTicketsModel;
