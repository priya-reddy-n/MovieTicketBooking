const mongoose = require("mongoose");
const Models = require("../models/index");
const Services = require("../services/index");

class BookingService {
  bookTickets = async (
    userId,
    theatreName,
    theatreLocation,
    screenName,
    rowNumber,
    seatList,
    ticketID,
    paymentMode,
    screenId,
    ticketsCount,
    totalAmount,
    movieName,
    isCancellationAvailable,
    movieDate,
    movieTime,
    movieId,
    theatreId,
    posterName
  ) => {
    if ((userId, ticketsCount, totalAmount, movieDate)) {
      let insertData = {
        userId,
        theatreName,
        theatreLocation,
        screenName,
        rowNumber,
        seatList,
        ticketID,
        paymentMode,
        screenId,
        ticketsCount,
        totalAmount,
        movieName,
        isCancellationAvailable,
        movieDate: new Date(movieDate).toISOString(),
        movieTime,
        cancelledDate: null,
        ticketStatus: "Booked",
        movieId,
        theatreId,
        posterName,
      };

      //   insert booking details
      const resData = await Models.BookingModel.create(insertData);
      return JSON.parse(JSON.stringify(resData));
    }
    throw "Missing Booking Details";
  };

  cancelBooking = async (bookingId) => {
    if (bookingId) {
      let bookingData = await Models.BookingModel.findById(bookingId);
      bookingData = JSON.parse(JSON.stringify(bookingData));
      if (bookingData) {
        const { ticketsCount, theatreId, ticketStatus } = bookingData;
        if (ticketStatus === "Booked" && theatreId) {
          const resData = await Models.BookingModel.where({
            _id: mongoose.Types.ObjectId(bookingId),
          }).updateOne({ $set: { ticketStatus: "Cancelled" } });
          return JSON.parse(JSON.stringify(resData));
        } else {
          throw "Ticket Already Cancelled";
        }
      } else {
        throw "Booking Details not Found";
      }
    }
  };

  fetchBookingHistory = async (userId) => {
    const data = await Models.BookingModel.find({ userId: userId });
    if (data) {
      return JSON.parse(JSON.stringify(data));
    } else {
      return [];
    }
    throw "Fetching Booking History Failed";
  };
}

module.exports = BookingService;
