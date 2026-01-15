const nodemailer = require("nodemailer")
const dotenv = require("dotenv")

dotenv.config()

const sendOtpEmail = async(email , otp) => {
 const transporter = nodemailer.createTransport({
    service:"gmail",
    auth : {
        user:process.env.EMAIL_USER,
        pass:process.env.EMAIL_PASS

    }
    
 })

 const mailOption = {
    from : process.env.EMAIL_USER,
    to : email,
    subject : "Password Reset OTP",
    text : `Your OTP is ${otp} this is otp is valid for 10 minutes`
 }

 await transporter.sendMail(mailOption)
}


module.exports = sendOtpEmail;