const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params; // get token from URL

    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token is missing",
      });
    }

    // Verify JWT token
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Set user as verified
    user.isVerified = true;
    await user.save();

    res.status(200).json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = verifyEmail;
