const mongoose = require("mongoose");

const npcSchema = mongoose.Schema({
  id: { type: String, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
});

module.exports = mongoose.model("NPC", npcSchema);
