# 🚚 FleetLink - Logistics Vehicle Booking System

FleetLink is a full-stack web application for managing and booking logistics vehicles.  
It includes:

- **Backend**: Node.js + Express + MongoDB
- **Frontend**: React (Vite + TypeScript)
- **Database**: MongoDB
- **Testing**: Jest + Supertest (backend)

---

## 📂 Project Structure

```
.
├── fleetlink-backend/   # Backend (Express + MongoDB + Jest)
│   ├── src/
│   └── Dockerfile
├── fleetlink-frontend/  # Frontend (React + Vite + TS)
│   ├── src/
│   └── Dockerfile
├── docker-compose.yml   # Compose setup for backend, frontend, mongo
└── README.md
```

---

## 🔧 Features

### Backend

- **POST /api/vehicles** → Add a new vehicle
- **GET /api/vehicles/available** → Search for available vehicles
- **POST /api/bookings** → Book a vehicle (conflict-checked)
- Ride duration formula (simplified):
  ```
  estimatedRideDurationHours = Math.abs(toPincode - fromPincode) % 24
  ```

### Frontend

- **Add Vehicle Page** → Form to add vehicles
- **Search & Book Page** → Search available vehicles and book instantly
- Uses Axios for API calls and TailwindCSS for styling

### Testing

- Unit + integration tests for critical backend logic
- Runs with Jest + Supertest + mongodb-memory-server

---

## 🚀 Local Setup

### 1. Clone Repo

```bash
git clone https://github.com/iamsjunaid/vehicles_booking_system
cd vehicles_booking_system
```

### 2. Backend

```bash
cd fleetlink-backend
npm install

# copy environment variables
cp .env.example .env

# edit .env
MONGO_URI=mongodb://localhost:27017/fleetlink
PORT=5000

# run dev
npm run dev

# run tests
npm test
```

### 3. Frontend

```bash
cd ../fleetlink-frontend
npm install

# run dev
npm run dev
```

- Backend → `http://localhost:5000`
- Frontend → `http://localhost:5173`

---

## 🐳 Docker Setup

Ensure [Docker](https://www.docker.com/) and [docker-compose](https://docs.docker.com/compose/) are installed.

### 1. Build & Run

```bash
docker-compose build
docker-compose up
```

### 2. Services

- Frontend → http://localhost:3000
- Backend → http://localhost:5000
- MongoDB → localhost:27017

---

## 📦 API Endpoints

### Vehicles

- **POST /api/vehicles**

```json
{ "name": "Truck A", "capacityKg": 1000, "tyres": 6 }
```

- **GET /api/vehicles/available**

```
/api/vehicles/available?capacityRequired=500&fromPincode=100001&toPincode=100020&startTime=2025-09-18T10:00:00Z
```

### Bookings

- **POST /api/bookings**

```json
{
  "vehicleId": "64c12345...",
  "fromPincode": "100001",
  "toPincode": "100020",
  "startTime": "2025-09-18T10:00:00Z",
  "customerId": "cust123"
}
```

---

## 🏆 Bonus Features

- Dockerized full stack (`docker-compose`)
- TailwindCSS styling
- Extendable with:
  - Booking cancellation (`DELETE /api/bookings/:id`)
  - Advanced ride duration logic
  - Pagination or filtering in frontend

---

## 👨‍💻 Author

Built by **Junaid** ✨
