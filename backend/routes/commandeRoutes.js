const express = require("express");
const router = express.Router();
const commandeController = require("../controllers/commandeController");

// Passer une nouvelle commande
router.post("/", commandeController.createCommande);

// Récupérer toutes les commandes
router.get("/", commandeController.getAllCommandes);

// Modifier une commande
router.put("/:id", commandeController.updateCommande);

// Supprimer une commande
router.delete("/:id", commandeController.deleteCommande);

module.exports = router;
