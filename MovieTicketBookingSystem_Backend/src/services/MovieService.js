const ReadExcel = require("read-excel-file/node");
const Models = require("../models/index");
const Services = require("../services/index");
class MovieService {
  insertMovieDetails = async () => {
    await Models.MovieModel.deleteMany({}).then(() => {
      console.log("Previous Movie collection Data Removed");
    });

    let resData = [];
    await ReadExcel("./src/data/Movie.xlsx").then((rowData) => {
      if (rowData) {
        rowData.map(async (rec, index) => {
          let castDetails = rec[3]
            .trim()
            .split(",")
            .map((rec) => rec.trim());
          let genreDetails = rec[2]
            .trim()
            .split(",")
            .map((rec) => rec.trim());
          let insertData = {
            movieName: rec[1],
            movieGenre: genreDetails,
            castDetails,
            plot: rec[4],
            ratings: rec[5],
            runTime: rec[6],
            releaseDate: rec[7],
            posterName: rec[8],
          };
          const releaseDate = new Date(rec[7]);
          const endDate = new Date(
            releaseDate.getTime() + 25 * 1000 * 60 * 60 * 24
          );
          insertData = { ...insertData, lastShowDate: endDate };
          if (index !== 0) {
            resData = await Models.MovieModel.create(insertData);
          }
        });
        return resData;
      } else {
        throw "Empty Excel sheet !";
      }
    });
    return "Movie Details Created";
  };

  fetchAllMovieDetails = async () => {
    let data = await Models.MovieModel.find();
    if (data) {
      data = JSON.parse(JSON.stringify(data));
      data = data.map(({ __v, ...rec }) => rec);
      return data;
    }
    throw "Data Fetching failed";
  };

  fetchMovieDetails = async (movieId) => {
    let data = await Models.MovieModel.findOne({ _id: movieId });
    if (data) {
      data = JSON.parse(JSON.stringify(data));
      return data;
    }
    throw "Data Fetching Failed";
  };

  fetchMovieOnLocation = async (input) => {
    let data = null;
    if (input) {
      if (input === "all") {
        data = await Models.TheatreModel.find({});
      } else {
        data = await Models.TheatreModel.find({})
          .where("location")
          .equals(input);
      }
    } else {
      throw "NO Data for provided location";
    }
    if (data) {
      data = JSON.parse(JSON.stringify(data));
      const movieIdsList = data.map((rec) => rec.movieId);
      const movieResData = await Models.MovieModel.find({
        _id: { $in: movieIdsList },
      });
      if (movieResData) {
        return JSON.parse(JSON.stringify(movieResData));
      }
      return [];
    }
    throw " Movie details fetching Failed";
  };
  createMovie = async (
    movieName,
       movieGenre,
       plot,
       castDetails,
       ratings,
       runTime,
       releaseDate,
       lastShowDate,
       posterName
  ) => {
    console.log("hello")

      let insertData = {
        movieName,
       movieGenre,
       plot,
       castDetails,
       ratings,
       runTime,
       releaseDate,
       lastShowDate,
       posterName
      };

      //   insert booking details
      const resData = await Models.MovieModel.create(insertData);
      if(resData){
        return "updated"

      }
    };
    updateMovie = async (
      movie,
      movieName,
         movieGenre,
         plot,
         castDetails,
         ratings,
         runTime,
         releaseDate,
         lastShowDate,
         posterName
    ) => {
      console.log("hello")
  
        let insertData = {
          movieName:movieName,
          movieGenre:movieGenre,
          plot:plot,
          castDetails:castDetails,
          ratings:ratings,
          runTime:runTime,
          releaseDate:releaseDate,
         lastShowDate:lastShowDate,
         posterName:posterName
        };
  
        //   insert booking details
        const resData = await Models.MovieModel.updateOne({movieName:movie},insertData);
        console.log("here")
        if(resData){
          return "updated"

        }
        return "Updated";
      };
      deleteMovie = async (
        movie
      ) => {
        console.log("hello")
    
          //   insert booking details
          const resData = await Models.MovieModel.deleteOne({movieName:movie});
          if(resData){
          return "Deleted";}
        }
 
  


}

module.exports = MovieService;
