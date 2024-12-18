const express = require("express");
const path = require("path");
const http = require("http");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const scenariosRoutes = require("./routes/scenariosRoutes.cjs");
const npcsRoutes = require("./routes/npcsRoutes.cjs");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(logger("dev")); // Tell express to use the Morgan logger

// Add support for CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept",
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, PUT, DELETE, OPTIONS",
  );
  next();
});

// Serve static files from the Vite build directory
// app.use(express.static(path.join(__dirname, "../dist")));

// Handle any other routes (e.g., for a single-page app)
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "../dist", "index.html"));
// });

// REST endpoints
app.use("/scenarios", scenariosRoutes);
app.use("/npcs", npcsRoutes);

// establish a connection to the mongo database
mongoose
  .connect("mongodb://127.0.0.1:27017/scenario-forge")
  .then(() => console.log("Connected To Scenario Forge!"))
  .catch((err) => console.log("Connection failed: " + err));

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
