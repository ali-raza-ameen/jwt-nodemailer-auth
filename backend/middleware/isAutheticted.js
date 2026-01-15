const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const Session = require("../models/sessionModel");

const isAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authorization token missing",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.TOKEN_SECRET_KEY);
    const userId = decoded.id;

    const session = await Session.findOne({ userId, token });
    if (!session) {
      return res.status(401).json({
        success: false,
        message: "Session expired. Please login again",
      });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.userId = userId;
    req.token = token;
    next();

  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = isAuth;
