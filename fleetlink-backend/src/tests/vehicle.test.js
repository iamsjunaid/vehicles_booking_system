// src/tests/vehicle.test.js
const request = require("supertest");
const app = require("../app");
const { connect, closeDatabase, clearDatabase } = require("./setupTestDB");
const Vehicle = require("../models/Vehicle");
const Booking = require("../models/Booking");

beforeAll(async () => await connect());
afterEach(async () => await clearDatabase());
afterAll(async () => await closeDatabase());

describe("Vehicles API", () => {
  test("POST /api/vehicles creates vehicle", async () => {
    const res = await request(app)
      .post("/api/vehicles")
      .send({ name: "Truck A", capacityKg: 1000, tyres: 6 });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Truck A");

    const v = await Vehicle.findOne({ name: "Truck A" });
    expect(v).not.toBeNull();
  });

  test("GET /api/vehicles/available returns only vehicles without overlapping bookings", async () => {
    // create two vehicles
    const v1 = await Vehicle.create({ name: "V1", capacityKg: 1000, tyres: 6 });
    const v2 = await Vehicle.create({ name: "V2", capacityKg: 2000, tyres: 8 });

    // create a booking for v1 that conflicts
    const start = new Date("2025-01-01T10:00:00Z");
    const end = new Date(start.getTime() + 2 * 60 * 60 * 1000); // 2h
    await Booking.create({
      vehicleId: v1._id,
      fromPincode: "100000",
      toPincode: "100002",
      startTime: start,
      endTime: end,
      customerId: "c1",
    });

    // search for availability at overlapping time for capacity 500
    const searchStart = new Date("2025-01-01T11:00:00Z").toISOString();
    const res = await request(app).get("/api/vehicles/available").query({
      capacityRequired: 500,
      fromPincode: "100000",
      toPincode: "100003",
      startTime: searchStart,
    });

    expect(res.status).toBe(200);
    // v1 should be blocked; v2 should be returned
    const names = res.body.map((v) => v.name);
    expect(names).toContain("V2");
    expect(names).not.toContain("V1");
  });
});
