const Session = require("../models/sessionModel");
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Incorrect password",
      });
    }

    if (!user.isVerified) {
      return res.status(403).json({
        success: false,
        message: "Verify your account before login",
      });
    }

    // 🔴 Delete old session(s)
    await Session.deleteMany({ userId: user._id });

    // 🔴 Generate JWT token
    const accessToken = jwt.sign(
      { id: user._id },
      process.env.TOKEN_SECRET_KEY,
      { expiresIn: "10d" }
    );

    // 🔴 Save session with token
    await Session.create({
      userId: user._id,
      token: accessToken,
    });

    // Mark user as logged in
    user.isLoggedIn = true;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Login successful ${user.name}`,
      accessToken,
      user,
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = userLogin;
