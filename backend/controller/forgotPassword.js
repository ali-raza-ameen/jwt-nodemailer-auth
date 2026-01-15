const userModel = require("../models/userModel");
const sendOtpEmail = require("../verifyEmail/sendOtpMail");

const userLogin = require("./userLoginController");

const forgotPassword = async (req, res) => {
  try {
    // Implementation for forgot password logic
    const { email } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiry = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

  user.otp = otp;
  user.otpExpiry = expiry;
  await user.save();
  await sendOtpEmail(user.email, otp);

  return res.status(200).json({
    success: true,
    message: "OTP sent successfully",
  });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};


module.exports  = forgotPassword;
