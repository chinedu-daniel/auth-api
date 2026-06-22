const { profile } = require("winston");
const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");
const userService = require("../services/userServices");

async function getProfile(req, res) {
    const profile = await userService.getProfile(req.user.userId);

    res.status(200).json(profile);
}

async function deleteUser(req, res) {
    const result = await userService.deleteUser(req.user.userId);

    res.status(200).json(result);
}

module.exports = {
    getProfile,
    deleteUser
}