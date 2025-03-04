const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route pour mot de passe oublié
router.post("/forgot-password", userController.forgotPassword);

module.exports = router;
