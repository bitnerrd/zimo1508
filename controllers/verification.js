const User = require("../models/User");

const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await User.findOne({ email: email });
  if (user && user.verified == false) {
    if (otp != user.otp) {
      res.send(`Invalid OTP, please try again with correct OTP`);
    } else {
      user.verified = true;
      const verifiedUser = await user.save();
      if (verifiedUser.verified == true) {
        res.send("You Email has been verified");
      } else {
        res.send(`User Verification Process Failed. Please try again`);
      }
    }
  } else {
    res.send(
      `User Not Found or already verified. User Verification Process Failed. Please try again`
    );
  }
};

module.exports = { verifyEmail };
