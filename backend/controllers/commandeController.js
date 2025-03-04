const Commande = require("../models/Commande");

// Créer une commande
const createCommande = async (req, res) => {
  const { name, quantity } = req.body;

  if (!name || quantity <= 0) {
    return res.status(400).json({ message: "Nom ou quantité invalide." });
  }

  try {
    const newCommande = new Commande({
      name,
      quantity,
      status: "en_attente",
      supplierStatus: "non_traite",
    });
    await newCommande.save();
    res.status(201).json({ message: "Commande créée avec succès!", commande: newCommande });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la création de la commande", error });
  }
};

// Récupérer toutes les commandes
const getAllCommandes = async (req, res) => {
  try {
    const commandes = await Commande.find();
    res.status(200).json({ commandes });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la récupération des commandes", error });
  }
};

// Mettre à jour une commande
const updateCommande = async (req, res) => {
  const { name, quantity, status, supplierStatus } = req.body;

  if (quantity !== undefined && quantity <= 0) {
    return res.status(400).json({ message: "Quantité invalide." });
  }

  try {
    const updatedCommande = await Commande.findByIdAndUpdate(
      req.params.id,
      { name, quantity, status, supplierStatus },
      { new: true }
    );
    if (!updatedCommande) {
      return res.status(404).json({ message: "Commande non trouvée." });
    }
    res.status(200).json({ message: "Commande mise à jour avec succès!", commande: updatedCommande });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la mise à jour de la commande", error });
  }
};

// Supprimer une commande
const deleteCommande = async (req, res) => {
  try {
    const deletedCommande = await Commande.findByIdAndDelete(req.params.id);
    if (!deletedCommande) {
      return res.status(404).json({ message: "Commande non trouvée." });
    }
    res.status(200).json({ message: "Commande supprimée avec succès!", commande: deletedCommande });
  } catch (error) {
    res.status(500).json({ message: "Erreur lors de la suppression de la commande", error });
  }
};

module.exports = { createCommande, getAllCommandes, updateCommande, deleteCommande };
