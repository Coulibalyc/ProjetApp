const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  totalOrders: { type: Number, required: true },
  completedOrders: { type: Number, required: true },
  canceledOrders: { type: Number, required: true },
  pendingOrders: { type: Number, required: true },
  dailyOrders: [
    {
      day: { type: String, required: true },
      orders: { type: Number, required: true },
    },
  ],
  createdAt: { type: Date, default: Date.now },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
