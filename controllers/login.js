const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const transporter = require("../auth/nodemailer");
const User = require("../models/User");
const IP = require("ip");

const _login = async (req, res) => {
  const { email, password } = req.body;
  // finding user
  const user = await User.findOne({ email });
  if (user) {
    const ip = IP.address();
    const vPassword = await bcrypt.compare(password, user.password);
    if (vPassword) {
      const token = jwt.sign(
        { _id: user._id },
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9",
        {
          expiresIn: "30d",
        }
      );
      const mailoptions = {
        from: "toxicsite0@gmail.com",
        to: email,
        subject: "ZIMO",
        text: `Detected an sign in attempt from ${email} with IP ${ip}`,
      };
      const responce = await transporter.sendMail(mailoptions);
      if ((await responce).accepted) {
        res
          //   .cookie("authcookie", token, { maxAge: 900000, httpOnly: true })
          .send("Logged IN");
      } else {
        res.send("Internal Server Error Occured");
      }
    } else {
      res.send(`Incorrect Password`);
    }
  } else {
    res.send(`User not found`);
  }
};
module.exports = _login;
