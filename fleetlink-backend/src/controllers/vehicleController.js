// src/controllers/vehicleController.js
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");
const { estimateRideDurationHours } = require("../utils/rideDuration");

exports.createVehicle = async (req, res) => {
  try {
    const { name, capacityKg, tyres } = req.body;
    if (!name || capacityKg == null || tyres == null) {
      return res
        .status(400)
        .json({ message: "name, capacityKg and tyres are required" });
    }
    const vehicle = await Vehicle.create({ name, capacityKg, tyres });
    res.status(201).json(vehicle);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getAvailableVehicles = async (req, res) => {
  try {
    const { capacityRequired, fromPincode, toPincode, startTime } = req.query;
    if (!capacityRequired || !fromPincode || !toPincode || !startTime) {
      return res
        .status(400)
        .json({
          message:
            "capacityRequired, fromPincode, toPincode and startTime are required",
        });
    }

    const capacityReq = Number(capacityRequired);
    const start = new Date(startTime);
    if (Number.isNaN(capacityReq) || isNaN(start.getTime())) {
      return res
        .status(400)
        .json({ message: "Invalid capacityRequired or startTime" });
    }

    const estimatedRideDurationHours = estimateRideDurationHours(
      fromPincode,
      toPincode
    );
    const end = new Date(
      start.getTime() + estimatedRideDurationHours * 60 * 60 * 1000
    );

    // vehicles matching capacity
    const vehicles = await Vehicle.find({
      capacityKg: { $gte: capacityReq },
    }).lean();

    // for each vehicle check overlapping bookings
    const available = [];
    for (const v of vehicles) {
      const conflict = await Booking.findOne({
        vehicleId: v._id,
        $expr: {
          $and: [
            { $lt: ["$startTime", end] }, // booking.startTime < requestedEnd
            { $gt: ["$endTime", start] }, // booking.endTime > requestedStart
          ],
        },
      }).lean();

      if (!conflict) {
        available.push({
          ...v,
          estimatedRideDurationHours,
        });
      }
    }

    res.json(available);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
