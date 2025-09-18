// src/app.js
const express = require("express");
const cors = require("cors");
const vehiclesRoute = require("./routes/vehicles");
const bookingsRoute = require("./routes/bookings");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/vehicles", vehiclesRoute);
app.use("/api/bookings", bookingsRoute);

// health
app.get("/", (req, res) =>
  res.send({ ok: true, message: "FleetLink backend running" })
);

// basic error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
});

module.exports = app;
