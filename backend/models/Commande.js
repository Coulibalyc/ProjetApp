const mongoose = require('mongoose');

const commandeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  status: {
    type: String,
    enum: ['en_attente', 'terminee', 'annulee'], // valeurs en français
    required: true
  },
  supplierStatus: {
    type: String,
    enum: ['non_traite', 'en_cours', 'terminee', 'echoue'], // valeurs en français
    required: true
  }
});

const Commande = mongoose.model('Commande', commandeSchema);

module.exports = Commande;
  