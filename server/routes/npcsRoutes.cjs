const express = require("express");
const crypto = require("crypto");
const NPC = require("../model/npc.cjs");
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  NPC.find()
    .then((npcs) => {
      res.status(200).json(npcs);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res, next) => {
  const npc = new NPC({
    id: crypto.randomUUID(),
    name: req.body.name,
    description: req.body.description,
  });

  npc
    .save()
    .then((createdNPC) => {
      res.status(201).json({
        message: "NPC added successfully",
        npc: createdNPC,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "An error occurred",
        error: error,
      });
    });
});

router.put("/:id", (req, res, next) => {
  NPC.findOne({ id: req.params.id })
    .then((npc) => {
      npc.name = req.body.name;
      npc.description = req.body.description;

      NPC.updateOne({ id: req.params.id }, npc)
        .then((result) => {
          res.status(204).json({
            message: "NPC updated successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "NPC not found.",
        error: { npc: "NPC not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  NPC.findOne({ id: req.params.id })
    .then((npc) => {
      NPC.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "NPC deleted successfully",
          });
        })
        .catch((error) => {
          res.status(500).json({
            message: "An error occurred",
            error: error,
          });
        });
    })
    .catch((error) => {
      res.status(500).json({
        message: "NPC not found.",
        error: { npc: "NPC not found" },
      });
    });
});
