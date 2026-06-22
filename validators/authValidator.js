const jwt = require("jsonwebtoken");

function validateRegister(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            message: "All field are required"
        });
    }

    next();
}

function validateLogin(req, res, next) {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "All field are required"
        });
    }

    next();
}

module.exports = { validateRegister, validateLogin };