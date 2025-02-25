const express = require("express");
const { login } = require("../Controllers/Admin");

const router = express.Router();

// Ruta de login
router.post("/login", login);

module.exports = router;