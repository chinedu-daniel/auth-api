const express = require("express");
const router =  express.Router();

const authMiddleware = require("../middleware/auth");
const { getProfile, deleteUser } = require("../controllers/userController");
const adminOnly = require("../middleware/role")

router.get("/profile", authMiddleware, getProfile);
router.delete("/:id", authMiddleware, adminOnly, deleteUser)

module.exports = router;