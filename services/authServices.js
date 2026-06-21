const { getDB } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


async function registerUser(data) {
    const db = getDB();
    const existingUser = await db.collection("users").findOne({ email: data.email });

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashpassword = await bcrypt.hash(data.password, 10);

    const newUser = await db.collection("users").insertOne({
        ...data,
        password: hashpassword
    });

    const token = jwt.sign(
        { userId: newUser.insertedId},
        process.env.JWT_SECRET
    );

    return {
        message: "User registered",
        token
    };
}


async function loginUser(data) {
        const db = getDB();
        const users = await db.collection("users").findOne({
            email: data.email
        });

        if (!users) {
            throw new Error("User not found");
        }

        // Compare password
        const isMatch = await bcrypt.compare(data.password, users.password);

        if (!isMatch) {
           throw new Error("Invalid credentials");
        }

        const token = jwt.sign(
            {
                userId: users._id,
            },
            process.env.JWT_SECRET,
            { expiresIn: "10m"}
        );

        return { 
            message: "User logged in",
            token
         };
}

module.exports = {
    registerUser,
    loginUser
}