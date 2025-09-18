// src/controllers/bookingController.js
const Booking = require("../models/Booking");
const Vehicle = require("../models/Vehicle");
const { estimateRideDurationHours } = require("../utils/rideDuration");

exports.createBooking = async (req, res) => {
  try {
    const { vehicleId, fromPincode, toPincode, startTime, customerId } =
      req.body;
    if (!vehicleId || !fromPincode || !toPincode || !startTime || !customerId) {
      return res
        .status(400)
        .json({
          message:
            "vehicleId, fromPincode, toPincode, startTime and customerId are required",
        });
    }

    const start = new Date(startTime);
    if (isNaN(start.getTime()))
      return res.status(400).json({ message: "Invalid startTime" });

    const vehicle = await Vehicle.findById(vehicleId);
    if (!vehicle) return res.status(404).json({ message: "Vehicle not found" });

    const hours = estimateRideDurationHours(fromPincode, toPincode);
    const end = new Date(start.getTime() + hours * 60 * 60 * 1000);

    // Re-check conflicts atomically using a findOne (should be ok for this assignment)
    const conflict = await Booking.findOne({
      vehicleId,
      $expr: {
        $and: [{ $lt: ["$startTime", end] }, { $gt: ["$endTime", start] }],
      },
    });

    if (conflict) {
      return res
        .status(409)
        .json({ message: "Vehicle already booked in given time window" });
    }

    const booking = await Booking.create({
      vehicleId,
      fromPincode,
      toPincode,
      startTime: start,
      endTime: end,
      customerId,
    });

    res.status(201).json(booking);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
