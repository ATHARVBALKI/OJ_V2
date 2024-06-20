const mongoose = require("mongoose");
const User = require("../models/User"); // Assuming you have a User model defined

exports.getallusers = async (req, res) => {
    try {
        const users = await User.find(); // Retrieve all users
        return res.status(200).json({
            success: true,
            users,
            message: "Users retrieved successfully",
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};