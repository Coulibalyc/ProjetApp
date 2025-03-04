const express = require('express');
const Bin = require('../models/Bin');
const router = express.Router();

// Route pour récupérer tous les bacs
router.get('/api/dashboard/manager', async (req, res) => {
  try {
    const bins = await Bin.find(); // Récupérer tous les bacs
    res.json({ bins });
  } catch (error) {
    res.status(500).json({ message: 'Erreur serveur', error });
  }
});

module.exports = router;
