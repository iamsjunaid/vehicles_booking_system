import AddVehicle from "./pages/AddVehicle";
import SearchBook from "./pages/SearchBook";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <div className="p-4 bg-gray-50 min-h-screen ">
        <h4 className="text-xl font-semibold">Welcome to Fleetlink</h4>
        <p className="text-gray-600 mb-2 text-sm">Your central hub for managing and booking logistics vehicles</p>
        <div className="flex space-x-4 mt-8">
          <SearchBook />
          <AddVehicle />
        </div>
      </div>
    </div>
  );
}

export default App;
