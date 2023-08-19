const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const otpGenerator = require("otp-generator");
const User = require("../models/User");
const transporter = require("../auth/nodemailer");
const { verifyEmail } = require("../controllers/verification");
const _login = require("../controllers/login");

// @dec- user registration
router.post("/register", async (req, res) => {
  const { name, email, phone, status, country, password, confirmPassword } =
    req.body;
  // error message array
  let errorMessages = [];
  // form validations
  if (!name || !email || !phone || !password || !confirmPassword) {
    errorMessages.push("Fill in all fields");
    res.status(400).send(errorMessages);
  } else if (password.length < 6) {
    errorMessages.push("Password must be at least 6 characters");
    res.status(400).send(errorMessages);
  } else if (password != confirmPassword) {
    errorMessages.push("Passwords do not match");
    res.status(400).send(errorMessages);
  } else {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.send(`User already exists! Try Login with Credentials `);
    } else {
      try {
        // Generate OTP
        const otp = otpGenerator.generate(4, {
          digits: true,
          upperCaseAlphabets: false,
          lowerCaseAlphabets: false,
          specialChars: false,
        });

        // Hash Password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);
        let date = new Date();
        const createdAt = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;
        console.log(createdAt);

        // User to Schema
        const newUser = User({
          name,
          email,
          phone,
          status,
          country,
          password: hash,
          otp,
          verified: true,
          createdAt: createdAt,
        });

        // Sending OTP
        const mailoptions = {
          from: "toxicsite0@gmail.com",
          to: email,
          subject: "Learnyfy OTP",
          text: `This email is computer genrated, Dont Reply
                Your One Time Password (OTP) is: ${otp}.
              `,
        };

        const savedUser = await newUser.save();
        if (savedUser) {
          // const responce = await transporter.sendMail(mailoptions);
          // if (responce.accepted) {
          //   res.send(`OTP ${otp} has been delivered to ${newUser.email}`);
          // } else {
          //   res.send("OTP Genration Failed.");
          // }
          res.send(`User Saved and OTP is not delivered`);
        } else {
          res.send(`Error occur while registering user, Try Again!`);
        }
      } catch (error) {
        console.log(error);
        res.send(error);
      }
    }
  }
});
// @dec- user Email Verification
router.post("/verify", verifyEmail);

router.post("/login", _login);

module.exports = router;
