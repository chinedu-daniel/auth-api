const { getDB } = require("../config/db");

async function registerUser(req, res){
    try {
        const db = getDB();
        const user = db.collections("users");

        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user exists
        const existingUser = await user.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // insert user
        const result = await users.insertOne({
            name,
            email,
            password
        });

        // Response
        res.status(201).json({
            message: "User registered successfully",
            userId: result.insertedId
        });
    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
}

module.exports = {
    registerUser
};