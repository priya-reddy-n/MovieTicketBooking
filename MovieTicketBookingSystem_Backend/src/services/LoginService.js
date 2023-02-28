const md5 = require("md5");
const UserModel = require("../models/UserModel");

class LoginService {
  loginUser = async (userName, password) => {
    if (userName && password) {
      const encryptPass = md5(password);

      const resData = await UserModel.findOne({
        userName,
        password: encryptPass,
      });
      return resData;
    }
    throw "Login Failed";
  };
}

module.exports = LoginService;
