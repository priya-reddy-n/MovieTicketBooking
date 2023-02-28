const mongoose = require("mongoose");
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    bookingId: Object,
    userId: Object,
    theatreName: String,
    theatreLocation: String,
    screenName: String,
    rowNumber: String,
    seatList: String,
    ticketID: String,
    paymentMode: String,
    screenId: Number,
    ticketsCount: Number,
    totalAmount: String,
    movieName: String,
    isCancellationAvailable: Boolean,
    movieDate: Date,
    movieTime: String,
    bookingDate: { type: Date, default: Date.now },
    CancelledDate: Date,
    ticketStatus: String,
    movieId: String,
    theatreId: String,
    posterName: String,
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("BookingDetails", bookingSchema);

module.exports = BookingModel;
