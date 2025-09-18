// src/routes/vehicles.js
const express = require("express");
const router = express.Router();
const vehicleController = require("../controllers/vehicleController");

router.post("/", vehicleController.createVehicle);
router.get("/available", vehicleController.getAvailableVehicles);

module.exports = router;
