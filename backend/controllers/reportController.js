const Report = require("../models/Report");

// Récupérer les rapports (par période, ex. semaine, mois)
const getReports = async (req, res) => {
  const { timeframe } = req.query;

  try {
    // Exemple : Gestion des données statiques ou récupération depuis MongoDB
    if (timeframe === "month") {
      const reports = await Report.find(); // Vous pouvez filtrer selon la période
      return res.status(200).json(reports[0] || {}); // Renvoie le premier rapport ou un objet vide
    }

    res.status(400).json({ message: "Période non prise en charge." });
  } catch (error) {
    console.error("Erreur lors de la récupération des rapports:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

// Créer un rapport (fonction utile si les rapports sont stockés)
const createReport = async (req, res) => {
  const { totalOrders, completedOrders, canceledOrders, pendingOrders, dailyOrders } = req.body;

  try {
    const newReport = new Report({
      totalOrders,
      completedOrders,
      canceledOrders,
      pendingOrders,
      dailyOrders,
    });

    await newReport.save();
    res.status(201).json({ message: "Rapport créé avec succès.", report: newReport });
  } catch (error) {
    console.error("Erreur lors de la création du rapport:", error);
    res.status(500).json({ message: "Erreur serveur", error });
  }
};

module.exports = {
  getReports,
  createReport,
};
