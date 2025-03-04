const express = require('express');
const {
  getManagerDashboard,
  getAdminDashboard,
  getSupplierDashboard,
} = require('../controllers/dashboardController');
const router = express.Router();

router.get('/manager', getManagerDashboard);
router.get('/admin', getAdminDashboard);
router.get('/supplier', getSupplierDashboard);

module.exports = router;
