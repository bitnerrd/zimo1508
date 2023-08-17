const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: "toxicsite0@gmail.com",
    pass: "fakefake@gmail",
    clientId:
      "822979750063-jn8s63cajvp2jl44gbceom53dsugojag.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04QQfS13Wpia6CgYIARAAGAQSNwF-L9IrhGF31Z6IdOAXZxW_F8txWmGmbVaVUUPSXsPDDjiUmdH3iU9S8hrvd6OzDAWSqOLKTqI",
  },
});
module.exports = transporter;
