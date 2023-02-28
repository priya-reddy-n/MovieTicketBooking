const md5 = require("md5");
const UserModel = require("../models/UserModel");

class RegisterService {
  registerUser = async (
    userName,
    password,
    fullName,
    location,
    emailId,
    phoneNumber
  ) => {
    if (
      userName &&
      password &&
      fullName &&
      location &&
      emailId &&
      phoneNumber
    ) {
      let resData = await UserModel.findOne({ userName });
      if (resData) {
        throw "User Name already exists";
      }
      const encyptPass = md5(password);
      resData = await UserModel.create({
        userName,
        password: encyptPass,
        fullName,
        location,
        emailId,
        phoneNumber,
      });
      return resData;
    }
    throw "Registration Failed";
  };
}

module.exports = RegisterService;
