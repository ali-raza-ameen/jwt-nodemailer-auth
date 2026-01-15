const userModel = require("../models/userModel");

const otpVerify = async (req, res) => {
  const { otp } = req.body;
  const email = req.params.email;

  if (!otp) {
    res.status(400).json({
      success: false,
      error: true,
      message: "OTP is required",
    });
  }
 try{
    const user = await userModel.findOne({ email });
    if(!user){
        return res.status(404).json({
            success: false,
            error: true,
            message: "User not found"
        })
    }
    if(!user.otp || !user.otpExpiry){
        return res.status(400).json({
            success: false,
            error: true,
            message: "OTP is Verified"
        })
    }

    if(user.otpExpiry < Date.now()){
        return res.status(400).json({
            success: false,
            error: true,
            message: "OTP expired please request a new one"
        })
    }
    if(user.otp !== otp){
        return res.status(400).json({
            success: false,
            error: true,
            message: "Invalid OTP"
        })
    }
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.status(200).json({
        success: true,
        error: false,
        message: "OTP verified successfully"
    })
 }catch(err){
    res.status(500).json({
        success: false,
        error: true,
        message: err.message
    })
 }

};

module.exports = otpVerify;
