const { getDB } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

async function registerUser(req, res){
    try {
        const db = getDB();
        const users = db.collection("users");

        const { name, email, password } = req.body;

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check if user exists
        const existingUser = await users.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // insert user
        const result = await users.insertOne({
            name,
            email,
            password:hashedPassword
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

async function loginUser(req, res) {
    try {
        const db = getDB();
        const users = db.collection("users");

        const { email, password } = req.body;

        const user = await users.findOne({ email });

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // Compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1m"}
        );

        res.status(200).json({
            message: "Login successful",
            token: token
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error"
        });
    }
}

module.exports = {
    registerUser,
    loginUser,
};