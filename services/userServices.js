const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

async function getProfile(userId) {
        const db = getDB();

        const user = await db.collection("users").findOne({ _id: new ObjectId(userId) });

        // if user exist or not found
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            throw error;
        }

        // return  user data
        return {
            name: user.name,
            email: user.email
        };
}

async function deleteUser(userId) {
    const db = getDB();
    const result = await db.collection("users").deleteOne({ _id: new Object(userId) });

    if (result.deletedCount === 0) {
        const error = new Error("User not found");
        error.statusCode = 404;
        throw error;
    }
    
    return{
        message: "User deleted successfully"
    };
}

module.exports = {
    getProfile,
    deleteUser
}