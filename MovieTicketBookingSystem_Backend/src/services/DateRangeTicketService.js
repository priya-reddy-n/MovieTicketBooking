const { LEGAL_TCP_SOCKET_OPTIONS } = require("mongodb");
const { default: mongoose } = require("mongoose");
const Models = require("../models/index");

class DateRangeTicketService {
  creatDateRangeTickets = async () => {
    await Models.DateRangeTicketModel.deleteMany({}).then(() => {
      console.log(
        "Previous Date range and ticket count collection Data Removed"
      );
    });

    const insertDataArray = [];
    let movieTheatreIdList = [];

    let moviesData = await Models.MovieModel.find({}).select({
      _id: 1,
      releaseDate: 1,
    });

    moviesData = JSON.parse(JSON.stringify(moviesData));

    const movieIdList = moviesData.map(({ _id }) =>
      mongoose.Types.ObjectId(_id)
    );

    let theatreData = await Models.TheatreModel.find({
      movieId: { $in: movieIdList },
    });

    theatreData = JSON.parse(JSON.stringify(theatreData));

    const totalData = [];

    for (let movieData of moviesData) {
      const { _id, releaseDate } = movieData;
      const filterData = theatreData.filter((rec) => rec.movieId === _id);
      filterData.forEach((rec) => {
        totalData.push({
          theatreId: rec._id,
          movieId: _id,
          releaseDate,
          timeTicketCount: rec.tickets,
        });
      });
    }

    if (totalData && totalData.length > 0) {
      totalData.forEach((rec) => {
        const { releaseDate, movieId, theatreId, timeTicketCount } = rec;
        const DatesRangeArray = [];
        if (releaseDate && movieId && theatreId && timeTicketCount) {
          let currentDate = new Date(releaseDate);
          DatesRangeArray.push(currentDate);
          for (let i = 1; i <= 25; i++) {
            let insertObj = {};
            currentDate = new Date(currentDate.getTime() + 1000 * 60 * 60 * 24);
            DatesRangeArray.push(currentDate);
            insertObj = {
              movieId,
              theatreId,
              movieDate: currentDate.toDateString(),
            };
            const ttcObj = JSON.parse(timeTicketCount);
            ttcObj.forEach(({ count, time }) => {
              insertObj = {
                ...insertObj,
                movieTiming: time,
                ticketCount: count,
              };
              insertDataArray.push(insertObj);
            });
          }
        }
      });
    }

    if (insertDataArray && insertDataArray.length > 0) {
      insertDataArray.forEach(async (data) => {
        await Models.DateRangeTicketModel.create(data);
      });
    }

    return "Data inserted";
  };

  // fetch
  fetchMovieTimings = async (movieId, theatreId, movieDate) => {
    const conDate = new Date(movieDate).toDateString();
    const resData = await Models.DateRangeTicketModel.find({})
      .where("movieId")
      .equals(movieId)
      .where("theatreId")
      .equals(theatreId)
      .where("movieDate")
      .equals(conDate);

    if (resData) {
      return JSON.parse(JSON.stringify(resData));
    }
    throw "Data Fetching Failed";
  };

  // update on booking
  updateBookingCount = async (
    movieId,
    theatreId,
    movieDate,
    movieTime,
    bookCount
  ) => {
    const data = await Models.DateRangeTicketModel.findOne()
      .where("movieId")
      .equals(movieId)
      .where("theatreId")
      .equals(theatreId)
      .where("movieDate")
      .equals(movieDate)
      .where("movieTiming")
      .equals(movieTime.toString());

    if (data) {
      const resData = JSON.parse(JSON.stringify(data));
      if (resData) {
        const { ticketCount } = resData;
        const newCount = ticketCount - bookCount;
        const upData = await Models.DateRangeTicketModel.where({
          movieId,
          theatreId,
          movieDate,
          movieTiming: movieTime,
        }).updateOne({ $set: { ticketCount: newCount } });
        return "Updated success";
      }
    }
  };
  // update on cancel
  updateCancelCount = async (
    movieId,
    theatreId,
    movieDate,
    movieTime,
    bookCount
  ) => {
    const data = await Models.DateRangeTicketModel.findOne()
      .where("movieId")
      .equals(movieId)
      .where("theatreId")
      .equals(theatreId)
      .where("movieDate")
      .equals(movieDate)
      .where("movieTiming")
      .equals(movieTime.toString());

    if (data) {
      const resData = JSON.parse(JSON.stringify(data));
      if (resData) {
        const { ticketCount } = resData;
        const newCount = ticketCount + bookCount;
        const upData = await Models.DateRangeTicketModel.where({
          movieId,
          theatreId,
          movieDate,
          movieTiming: movieTime,
        }).updateOne({ $set: { ticketCount: newCount } });
        return "Updated success";
      }
    }
  };
}

module.exports = DateRangeTicketService;
