const nodemailer = require("nodemailer")
const dotenv = require("dotenv")
dotenv.config()
const Verifyemail = async (token, email) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS

        }
    })

    const mailConfigurations = {
        from: process.env.MAIL_USER,
        to: email,
        subject: "Email Verification",
        html: `<h1>Email Verification</h1>
               <p>Click below to verify your email </p>
               <a href="http://localhost:3000/verify/${token}">
                   Verify Email
               </a>`
    }

   await transporter.sendMail(mailConfigurations, (error, info) => {
        if (error) {
            console.error(error)
        } else {
            console.log("Email Sent Successfully")
        }
    })
}

module.exports = { Verifyemail }
