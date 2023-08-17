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
    studentStatus: {
      type: Boolean,
      required: true,
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
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
