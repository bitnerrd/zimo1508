const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
    },
    email: {
      type: String,
      required: [true, "Email Required"],
    },
    phone: {
      type: Number,
      required: [true, "Phone Number Required"],
      maxLength: 11,
    },
    status: {
      type: Boolean,
      default: true,
    },
    country: {
      type: String,
      required: [true, "Country Required"],
    },
    password: {
      type: String,
      required: [true, "Password Required"],
    },
    otp: {
      type: Number,
      required: [true, "OTP Generation Failed"],
      maxLength: 4,
    },
    verified: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: false,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
