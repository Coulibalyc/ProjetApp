const mongoose = require('mongoose');
const Commande = require('./models/Commande'); // Assure-toi que le chemin est correct
require('dotenv').config();
const connectDB = require('./config/database');

connectDB();

const seedData = async () => {
  
    const commandes = [
        { name: 'Commande Nourriture A', quantity: 100, status: 'en_attente', supplierStatus: 'non_traite' },
        { name: 'Commande Nourriture B', quantity: 50, status: 'en_attente', supplierStatus: 'non_traite' },
        { name: 'Commande Nourriture C', quantity: 200, status: 'en_attente', supplierStatus: 'non_traite' },
        { name: 'Commande Nourriture D', quantity: 150, status: 'en_attente', supplierStatus: 'non_traite' },
        { name: 'Commande Nourriture E', quantity: 80, status: 'en_attente', supplierStatus: 'non_traite' }
      ];
      
      

  await Commande.deleteMany(); // Nettoyer les anciennes commandes
  await Commande.insertMany(commandes); // Insérer les nouvelles commandes
  console.log('Données des commandes initialisées');
  mongoose.connection.close();
};

seedData();
