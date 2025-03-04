const express = require("express");
const { getReports, createReport } = require("../controllers/reportController");

const router = express.Router();

// Route pour récupérer les rapports
router.get("/reports", getReports);

// Route pour créer un rapport (optionnelle)
router.post("/reports", createReport);

module.exports = router;
