// src/tests/booking.test.js
const request = require("supertest");
const app = require("../app");
const { connect, closeDatabase, clearDatabase } = require("./setupTestDB");
const Vehicle = require("../models/Vehicle");

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Bookings API", () => {
  test("POST /api/bookings succeeds when vehicle free", async () => {
    const v = await Vehicle.create({
      name: "Bookable",
      capacityKg: 1000,
      tyres: 6,
    });

    const startTime = new Date("2025-02-02T10:00:00Z").toISOString();
    const res = await request(app).post("/api/bookings").send({
      vehicleId: v._id.toString(),
      fromPincode: "200000",
      toPincode: "200002",
      startTime,
      customerId: "cust1",
    });

    expect(res.status).toBe(201);
    expect(res.body.vehicleId).toBe(String(v._id));
  });

  test("POST /api/bookings returns 409 when conflicting booking exists", async () => {
    const v = await Vehicle.create({
      name: "Booked",
      capacityKg: 1000,
      tyres: 6,
    });

    // initial booking: start 10:00, duration computed between pincodes (abs diff %24)
    const initialStart = new Date("2025-03-03T10:00:00Z");
    // compute duration with simple logic - use 2 hours by selecting pincodes with diff 2
    const initialBooking = await request(app).post("/api/bookings").send({
      vehicleId: v._id.toString(),
      fromPincode: "300000",
      toPincode: "300002",
      startTime: initialStart.toISOString(),
      customerId: "c1",
    });
    expect(initialBooking.status).toBe(201);

    // now try to book overlapping time (11:00) - should conflict
    const overlappingStart = new Date("2025-03-03T11:00:00Z").toISOString();
    const res = await request(app).post("/api/bookings").send({
      vehicleId: v._id.toString(),
      fromPincode: "300000",
      toPincode: "300002",
      startTime: overlappingStart,
      customerId: "c2",
    });

    expect(res.status).toBe(409);
  });
});
