const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");
const bcrypt = require("bcrypt");

async function getProfile(req, res) {
    try {
        const db = getDB();
        const users = db.collection("users");

        // get userId from middleware
        const userId = req.user.userId;

        // find user in DB
        const user = await users.findOne({ _id: new ObjectId(userId) });

        // if user exist or not found
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        // return  user data
        res.status(200).json({
            name: user.name,
            email: user.email
        });

    } catch(error) {
        res.status(500).json({
            message: "server error",
            error: error.message
        });
    }
}

async function deleteUser(req, res) {
    const db = getDB();
    const users = db.collection("users");

    const userId = req.params.id;

    const user = await users.deleteOne({ _id: new Object(userId) });

    res.json({
        message: "User deleted"
    })
}

module.exports = {
    getProfile,
    deleteUser
}