const Bin = require('../models/Bin');

// Récupérer les données pour le manager
exports.getManagerDashboard = async (req, res) => {
  try {
    const bins = await Bin.find();
    res.json({ bins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Récupérer les statistiques globales pour l'administrateur
exports.getAdminDashboard = async (req, res) => {
  try {
    const bins = await Bin.find();
    const totalBins = bins.length;
    const emptyBins = bins.filter((bin) => bin.status === 'empty').length;
    const lowBins = bins.filter((bin) => bin.status === 'low').length;

    res.json({
      stats: { totalBins, emptyBins, lowBins },
      bins,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Fournir des informations pertinentes pour le fournisseur
exports.getSupplierDashboard = async (req, res) => {
  try {
    const bins = await Bin.find({ status: { $in: ['low', 'empty'] } });
    res.json({ bins });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
