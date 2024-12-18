const mongoose = require("mongoose");

const scenarioSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  children: { type: [String], required: true },
});

module.exports = mongoose.model("Scenario", scenarioSchema);
