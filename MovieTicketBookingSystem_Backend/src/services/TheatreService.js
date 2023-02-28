const mongoose = require("mongoose");
const ReadExcel = require("read-excel-file/node");
const Models = require("../models/index");

class TheatreService {
  insertTheatreDetails = async () => {
    await Models.TheatreModel.deleteMany({}).then(() => {
      console.log("Previous Theatre collection Data Removed");
    });

    const data = await Models.MovieModel.findOne({});
    if (!data) {
      throw "Create Movie Details First";
    }

    const movieData = await Models.MovieModel.find({});
    let IdList = movieData.map((rec) => rec._id);
    IdList = IdList.sort(() => Math.random() - 0.5);
    const moviesLength = IdList.length;

    await ReadExcel("./src/data/Theatre.xlsx").then((rowData) => {
      if (rowData) {
        rowData.map(async (rec, index) => {
          const currIndex = index % moviesLength;
          const currId = IdList[currIndex] || IdList[0];
          let insertData = {
            theatreName: rec[1],
            screenCount: rec[2],
            screenId: rec[3],
            screenName: rec[4],
            tickets: rec[5],
            isCancellationAvailable: rec[6],
            ticketAmount: rec[7],
            location: rec[8],
            movieId: mongoose.Types.ObjectId(currId),
          };

          if (index !== 0) {
            await Models.TheatreModel.create(insertData);
          }
        });
      } else {
        throw "Empty Excel sheet !";
      }
    });
  };

  fetchTheatreDetails = async (movieid) => {
    const resData = await Models.TheatreModel.find({
      movieId: mongoose.Types.ObjectId(movieid),
    });
    if (resData) {
      return JSON.parse(JSON.stringify(resData));
    }

    throw "Theatre Details not Found";
  };

  fetchAllLocations = async () => {
    const resData = await Models.TheatreModel.find({}).select({
      location: 1,
      _id: 0,
    });
    if (resData) {
      let data = JSON.parse(JSON.stringify(resData));
      data = data.map((rec) => rec.location);
      data = data.filter((item, pos, self) => {
        return self.indexOf(item) == pos;
      });
      return data;
    }
    throw "Fetching Locations Failed";
  };
}

module.exports = TheatreService;
