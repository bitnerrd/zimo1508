const nodemailer = require("nodemailer");
let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAUTH2",
    user: "toxicsite0@gmail.com",
    pass: process.env.MAIL_PASSWORD,
    clientId:
      "822979750063-jn8s63cajvp2jl44gbceom53dsugojag.apps.googleusercontent.com",
    clientSecret: "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",
    refreshToken:
      "1//04a7eKqmcqefGCgYIARAAGAQSNwF-L9IrngO8SaCLiP5ESfqFl3NdiGuFHBmyMm6cAbt9jSFMJeq4Z0nl43y-WjGe-1lC5g2U3mI",
  },
});
module.exports = transporter;
