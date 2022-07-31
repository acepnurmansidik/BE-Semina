const nodemailer = require("nodemailer");
const Mustache = require("mustache");
const fs = require("fs");
const { gmail, password } = require("../../config");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: gmail,
    // password device
    pass: password,
  },
});

// send OTP to email participant
const otpMail = async (email, data) => {
  try {
    let template = fs.readFileSync("app/views/email/otp.html", "utf-8");

    let message = {
      from: gmail,
      to: email,
      subject: "Otp registration is: ",
      html: Mustache.render(template, data),
    };

    return await transporter.sendMail(message);
  } catch (err) {
    console.log(err);
  }
};

const invoiceMail=async(email,data)=>{
  try {
    let template =fs.readFileSync("app/views/email/invoice.html","utf-8")

    let message={
      from:gmail,
      to:email,
      subject:"Invoice semina payment",
      html:Mustache.render(template,data)
    }

    return await transporter.sendMail(message)
  } catch (err) {
    console.log(err)
  }
}

module.exports = { otpMail, invoiceMail };
