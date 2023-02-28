const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const ReadExcel = require("read-excel-file/node");
const Services = require("./services/index");
const Excel = require('exceljs');

const app = express();

app.use(
  cors({
    origin: "*",
  })
);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const url = "mongodb://0.0.0.0:27017";
const dbName = "MovieTicketBooking";

async function main() {
  await mongoose
    .connect(`${url}/${dbName}`, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("Database connected!"))
    .catch((err) => console.log(err));
}

main().then(console.log()).catch(console.error());

app.get("/", (req, res) => {
  return res.json("Server up and Running");
});

// Login User - username and password
app.post("/user/login", async (req, res) => {
  try {
    if (req.body) {
      const loginService = new Services.LoginService();
      const { userName, password } = req.body;
      if(userName=="admin"){
        return res.redirect('../../admin.html')
      }
      const resData = await loginService.loginUser(userName, password);
      if (resData) {
        return res.status(200).json({
          msg: "Logged In Successfully",
          data: { userId: resData._id, userName: resData.userName },
        });
      }
      return res.status(500).json("Invalid Credentials");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

// User Registration
app.post("/user/register", async (req, res) => {
  try {
    if (req.body) {
      const registerService = new Services.RegisterService();
      const { userName, fullName, location, emailId, phoneNumber, password } =
        req.body;
      const resData = await registerService.registerUser(
        userName,
        password,
        fullName,
        location,
        emailId,
        phoneNumber
      );
      if (resData) {
        return res.status(200).json({
          msg: "Registered Successfully",
        });
      }
      return res.status(500).json("Registeration Failed");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.get("/insert/movie", async (req, res) => {
  try {
    const movieService = new Services.MovieService();
    await movieService.insertMovieDetails().then(async (res) => {
      if (res) {
        setTimeout(async () => {
          const theatreService = new Services.TheatreService();
          await theatreService.insertTheatreDetails();
        }, 2000);
      }
    });
    return res.status(200).json("Movie Details Inserted Successfully");
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.get("/insert/daterange", async (req, res) => {
  try {
    const dateRangeTicketService = new Services.DateRangeTicketService();
    await dateRangeTicketService.creatDateRangeTickets();
    return res.status(200).json("Date Range details created Successfully");
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

// app.get("/insert/theatre", async (req, res) => {
//   try {
//     const theatreService = new Services.TheatreService();
//     await theatreService.insertTheatreDetails();
//     return res.status(200).json("Theatre Details Inserted Successfully");
//   } catch (e) {
//     return res.status(400).json({ msg: e });
//   }
// });

app.get("/fetch/all/movies", async (req, res) => {
  try {
    const movieService = new Services.MovieService();
    const resData = await movieService.fetchAllMovieDetails();
    if (resData) {
      return res.status(200).json(resData);
    }
    return res.status(400).json("Data Fetch Failed");
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.get("/fetch/theatre/details", async (req, res) => {
  try {
    if (req && req.query) {
      const { movieId } = req.query;
      const theatreService = new Services.TheatreService();
      const resData = await theatreService.fetchTheatreDetails(movieId);
      if (resData) {
        return res.status(200).json(resData);
      }
      return res.status(400).json("Data Fetch Failed");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.post("/book/tickets", async (req, res) => {
  try {
    if (req && req.body) {
      const {
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
        posterName,
      } = req.body;

      const bookingService = new Services.BookingService();
      const resData = await bookingService.bookTickets(
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
      );
      if (resData) {
        // handle ticket count
        const dateRangeTicketService = new Services.DateRangeTicketService();
        await dateRangeTicketService.updateBookingCount(
          movieId,
          theatreId,
          movieDate,
          movieTime,
          ticketsCount
        );
        return res
          .status(200)
          .json({ msg: "Tickets Booked Successfully", data: resData });
      }
      return res.status(400).json("Tickets Booking Failed");
    }
    return res.status(400).json("Invalid Booking Details");
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.get("/fetch/movie/details", async (req, res) => {
  try {
    if (req && req.query) {
      const { movieId } = req.query;
      const movieService = new Services.MovieService();
      const resData = await movieService.fetchMovieDetails(movieId);
      if (resData) {
        return res.status(200).json(resData);
      }
      return res.status(400).json("Movie Details Fetching Failed");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.post("/create/movie", async (req, res) => {

  const movieService = new Services.MovieService();

  const movieName=req.body.movieName
  const movieGenre=req.body.movieGenre
  const plot=req.body.plot
  const castDetails=req.body.castDetails
  const ratings=req.body.ratings
  const runTime=req.body.runTime
  const releaseDate=req.body.releaseDate
  const lastShowDate=req.body.lastShowDate
  const posterName=req.body.posterName
  console.log("hello")
        try{
          if(req && req.body){
            const{
              movieGenre,
              plot,
              castDetails,
               ratings,
               runTime,
             releaseDate,
             lastShowDate,
             posterName
            }= req.body
            const movieService = new Services.MovieService();
            const resData = await movieService.createMovie( 
              movieName,
              movieGenre,
              plot,
              castDetails,
              ratings,
              runTime,
              releaseDate,
              lastShowDate,
              posterName);

          }
          return res.json({"Message":"Movie Created"}).status(200)
        }
        catch(err){
          return err;
        }

     
});

app.patch("/update/movie", async (req, res) => {
  const {movie}=req.query
  
  console.log(movie)
  const movieService = new Services.MovieService();

  const movieName=req.body.movieName
  const movieGenre=req.body.movieGenre
  const plot=req.body.plot
  const castDetails=req.body.castDetails
  const ratings=req.body.ratings
  const runTime=req.body.runTime
  const releaseDate=req.body.releaseDate
  const lastShowDate=req.body.lastShowDate
  const posterName=req.body.posterName
  console.log("hello")
        try{
          if(req && req.body){
            const{
              movieGenre,
              plot,
              castDetails,
               ratings,
               runTime,
             releaseDate,
             lastShowDate,
             posterName
            }= req.body
            const movieService = new Services.MovieService();
            const resData = await movieService.updateMovie( 
              movie,
              movieName,
              movieGenre,
              plot,
              castDetails,
              ratings,
              runTime,
              releaseDate,
              lastShowDate,
              posterName);

          }
          console.log("here here")
          return res.json({"Message":"Movie Updated"}).status(200)
        }
        catch(err){
          return err;
        }

     
});



app.delete("/delete/movie", async (req, res) => {
  const {movie}=req.query
  console.log(movie)
  console.log("hello")
        try{
            const movieService = new Services.MovieService();
            const resData = await movieService.deleteMovie(movie);

          
          return res.status(200).json({"Message":"Movie Deleted"});}
          
        catch(err){
          return err;
        }

     
});




app.post("/cancel/tickets", async (req, res) => {
  try {
    if (req && req.body) {
      const {
        bookingId,
        movieId,
        theatreId,
        movieDate,
        movieTime,
        ticketCount,
      } = req.body;
      const bookingService = new Services.BookingService();
      const resData = await bookingService.cancelBooking(bookingId);
      if (resData) {
        const dateRangeTicketService = new Services.DateRangeTicketService();
        await dateRangeTicketService.updateCancelCount(
          movieId,
          theatreId,
          movieDate,
          movieTime,
          ticketCount
        );
        return res.status(200).json("Ticket Cancelled");
      }
      return res.status(400).json("Tickets Cancellation Failed");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.get("/fetch/booking/history", async (req, res) => {
  try {
    if (req && req.query) {
      const { userId } = req.query;
      const bookingService = new Services.BookingService();
      const resData = await bookingService.fetchBookingHistory(userId);
      if (resData) {
        return res.status(200).json(resData);
      }
      return res.status(400).json("Booking History Fetching Failed");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.get("/fetch/locations", async (req, res) => {
  try {
    const theatreService = new Services.TheatreService();
    const resData = await theatreService.fetchAllLocations();
    if (resData) {
      return res.status(200).json(resData);
    }
    return res.status(400).json("Location Fetching Failed");
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.get("/fetch/movie/location", async (req, res) => {
  try {
    if (req && req.query) {
      const { location } = req.query;
      const movieService = new Services.MovieService();
      const resData = await movieService.fetchMovieOnLocation(location);
      if (resData) {
        return res.status(200).json(resData);
      }
      return res.status(400).json("Movie Data Fetching Failed");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.post("/fetch/timings", async (req, res) => {
  try {
    if (req && req.body) {
      const { movieId, theatreId, movieDate } = req.body;
      const DateRangeService = new Services.DateRangeTicketService();
      const resData = await DateRangeService.fetchMovieTimings(
        movieId,
        theatreId,
        movieDate
      );
      if (resData) {
        return res.status(200).json(resData);
      }
      return res.status(400).json("Movie Timings Fetching Failed");
    }
  } catch (e) {
    return res.status(400).json({ msg: e });
  }
});

app.listen(8000, () => {
  console.log("Server running in http://localhost:8000");
});
