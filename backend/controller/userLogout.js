const Session = require("../models/sessionModel");
const User = require("../models/userModel");

const userLogout = async (req, res) => {


  const userLogout = async() => {
    
  }
  try {
    const { userId, token } = req;

    // Delete the session
    await Session.findOneAndDelete({ userId, token });

    // Update user status
    await User.findByIdAndUpdate(userId, { isLoggedIn: false });

    return res.status(200).json({
      success: true,
      message: "User logged out successfully",
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = userLogout;
