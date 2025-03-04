const mongoose = require('mongoose');
const Report = require('./models/Report');
require('dotenv').config();
const connectDB = require('./config/database');

connectDB();

const seedReportData = async () => {
  const reportData = {
    totalOrders: 200,
    completedOrders: 150,
    canceledOrders: 30,
    pendingOrders: 20,
    dailyOrders: [
      { day: '2024-12-01', orders: 30 },
      { day: '2024-12-02', orders: 25 },
      { day: '2024-12-03', orders: 35 },
      { day: '2024-12-04', orders: 40 },
      { day: '2024-12-05', orders: 50 },
    ],
  };

  await Report.deleteMany(); // Nettoyer les anciens rapports
  await Report.create(reportData); // Insérer les nouveaux rapports
  console.log('Données du rapport initialisées');
  mongoose.connection.close();
};

seedReportData();
