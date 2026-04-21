


const User = require("../model/userModel");

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching users",
        });

    }
}

module.exports = { getAllUsers };


