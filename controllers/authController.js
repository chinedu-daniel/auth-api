const { getDB } = require("../config/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const logger = require("../config/logger");

const authService = require("../services/authServices");

async function registerUser(req, res){
    const result = await authService.registerUser(req.body);

    res.json(result);
}

async function loginUser(req, res) {
    const result = await authService.loginUser(req.body);

    res.json(result);
}

module.exports = {
    registerUser,
    loginUser,
};