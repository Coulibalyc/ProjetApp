const mongoose = require('mongoose');

const BinSchema = new mongoose.Schema({
  name: { type: String, required: true },
  currentLevel: { type: Number, required: true }, // Niveau actuel
  capacity: { type: Number, required: true }, // Capacité maximale
  status: { type: String, enum: ['normal', 'low', 'empty'], default: 'normal' }, // État du bac
  location: { type: String, required: true }, // Localisation
  lastRefilled: { type: Date, default: Date.now }, // Dernier remplissage
});

module.exports = mongoose.model('Bin', BinSchema);
