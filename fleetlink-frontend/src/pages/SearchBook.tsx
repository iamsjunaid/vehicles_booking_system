import { useState, useEffect } from "react";
import API from "../services/api";
import VehicleCard from "../components/VehicleCard";
import { IoSearch, IoLocationSharp, IoFlagOutline } from "react-icons/io5";
import { GiWeight } from "react-icons/gi";
import { AxiosError } from "axios";
import type { Vehicle } from "../types";

function SearchBook() {
    const [form, setForm] = useState({
        capacityRequired: "",
        fromPincode: "",
        toPincode: "",
        startTime: "",
    });
    const [vehicles, setVehicles] = useState<Vehicle[]>([]);
    const [message, setMessage] = useState("");

    // Auto-hide message after 3 seconds
    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const searchVehicles = async () => {
        try {
            const res = await API.get<Vehicle[]>("/vehicles/available", { params: form });
            setVehicles(res.data);
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setMessage(err.response?.data?.message ? "Please fill in all fields" : "Error searching vehicles");
            } else {
                setMessage("Unexpected error occurred");
            }
        }
    };

    const bookVehicle = async (vehicleId: string) => {
        try {
            await API.post("/bookings", {
                vehicleId,
                fromPincode: form.fromPincode,
                toPincode: form.toPincode,
                startTime: form.startTime,
                customerId: "cust123",
            });
            setMessage("Booking successful!");
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setMessage(err.response?.data?.message || "Error booking vehicle");
            } else {
                setMessage("Unexpected error occurred");
            }
        }
    };

    return (
        <div className=" p-4 rounded w-1/2 bg-white border border-gray-100 shadow">
            <h2 className="text-xl flex space-x-4 items-center">
                <span className="mr-2"><IoSearch /></span>Search & Book Vehicle
            </h2>
            <p className="text-gray-600 mb-2 text-sm">
                Find the perfect vehicle for your needs
            </p>

            {/* Form */}
            <div className="space-y-4 flex flex-col">
                <div className="flex space-x-2 w-full">
                    <div className="relative">
                        <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800 w-1/2">
                            <GiWeight size={20} />
                        </i>
                        <input
                            type="number"
                            max={100000}
                            name="capacityRequired"
                            placeholder="Capacity Required"
                            value={form.capacityRequired}
                            onChange={handleChange}
                            className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded h-12 p-2 pl-10"
                        />
                    </div>
                    <input
                        type="datetime-local"
                        name="startTime"
                        value={form.startTime}
                        onChange={handleChange}
                        className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-12 w-1/2 rounded p-2"
                    />
                </div>

                <div className="flex space-x-2 w-full">
                    <div className="relative w-1/2">
                        <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800">
                            <IoLocationSharp size={20} />
                        </i>
                        <input
                            maxLength={6}
                            name="fromPincode"
                            placeholder="From Pincode"
                            value={form.fromPincode}
                            onChange={handleChange}
                            className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-12 rounded p-2 pl-10"
                        />
                    </div>
                    <div className="relative w-1/2">
                        <i className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-800">
                            <IoFlagOutline size={20} />
                        </i>
                        <input
                            maxLength={6}
                            name="toPincode"
                            placeholder="To Pincode"
                            value={form.toPincode}
                            onChange={handleChange}
                            className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full h-12 rounded p-2 pl-10"
                        />
                    </div>
                </div>

                <button
                    onClick={searchVehicles}
                    className="bg-green-500 text-white px-4 py-2 rounded"
                >
                    Search
                </button>
            </div>

            {/* Results */}
            <p className="font-semibold my-2">Search Results:</p>
            {message && <p className="mt-4 text-center font-semibold">{message}</p>}
            {vehicles.length > 0 && (
                <div className="mt-4 space-y-2">
                    {vehicles.map((v) => (
                        <VehicleCard key={v._id} vehicle={v} onBook={() => bookVehicle(v._id)} />
                    ))}
                </div>
            )}
        </div>
    );
}

export default SearchBook;
