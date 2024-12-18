const express = require("express");
const crypto = require("crypto");
const Scenario = require("../model/scenario.cjs");
const router = express.Router();
module.exports = router;

router.get("/", (req, res) => {
  Scenario.find()
    .then((scenarios) => {
      res.status(200).json(scenarios);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.post("/", (req, res, next) => {
  const scenario = new Scenario({
    id: crypto.randomUUID(),
    name: req.body.name,
    children: req.body.children,
  });

  scenario
    .save()
    .then((createdScenario) => {
      res.status(201).json({
        message: "Scenario added successfully",
        scenario: createdScenario,
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
  Scenario.findOne({ id: req.params.id })
    .then((scenario) => {
      scenario.name = req.body.name;
      scenario.children = req.body.children;

      Scenario.updateOne({ id: req.params.id }, scenario)
        .then((result) => {
          res.status(204).json({
            message: "Scenario updated successfully",
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
        message: "Scenario not found.",
        error: { scenario: "Scenario not found" },
      });
    });
});

router.delete("/:id", (req, res, next) => {
  Scenario.findOne({ id: req.params.id })
    .then((scenario) => {
      Scenario.deleteOne({ id: req.params.id })
        .then((result) => {
          res.status(204).json({
            message: "Scenario deleted successfully",
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
        message: "Scenario not found.",
        error: { scenario: "Scenario not found" },
      });
    });
});
