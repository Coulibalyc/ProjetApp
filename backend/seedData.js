const mongoose = require('mongoose');
const Bin = require('./models/Bin');
require('dotenv').config();
const connectDB = require('./config/database');

connectDB();

const seedData = async () => {
  const bins = [
    { name: 'Bac 1', currentLevel: 20, capacity: 100, status: 'low', location: 'Zone A' },
    { name: 'Bac 2', currentLevel: 60, capacity: 100, status: 'normal', location: 'Zone B' },
    { name: 'Bac 3', currentLevel: 0, capacity: 100, status: 'empty', location: 'Zone C' },
    { name: 'Bac 4', currentLevel: 30, capacity: 100, status: 'low', location: 'Zone D' },
  ];

  await Bin.deleteMany(); // Nettoyer les anciens bacs
  await Bin.insertMany(bins); // Insérer les nouveaux bacs
  console.log('Données des bacs initialisées');
  mongoose.connection.close();
};

seedData();
