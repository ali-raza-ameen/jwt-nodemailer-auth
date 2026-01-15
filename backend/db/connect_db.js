const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const coo = await mongoose.connect(process.env.MONGODB_URL);
    console.log(`Mongodb Connected Successfuly ${coo.connection.host} `);
  } catch (error) {
    console.error("❌ DB Connection Failed:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
