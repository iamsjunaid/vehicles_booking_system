import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";

function App() {
  return (
    <Router>
      <div className="p-4">
        <nav className="space-x-4 mb-4">
          <Link to="/add-vehicle">Add Vehicle</Link>
          <Link to="/search-book">Search & Book</Link>
        </nav>
        <Routes>
          <Route path="/add-vehicle" element={<AddVehicle />} />
          <Route path="/search-book" element={<SearchBook />} />
          <Route path="*" element={<div>Welcome to FleetLink</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
