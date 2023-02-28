const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: String,
    fullName: String,
    location: String,
    emailId: String,
    phoneNumber: String,
    password: String,
  },
  { timestamps: true }
);

const UserModel = mongoose.model("UsersDetail", userSchema);

module.exports = UserModel;
