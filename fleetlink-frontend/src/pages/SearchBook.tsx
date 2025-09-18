import { useState } from "react";
import API from "../services/api";
import VehicleCard from "../components/VehicleCard";

function SearchBook() {
    const [form, setForm] = useState({
        capacityRequired: "",
        fromPincode: "",
        toPincode: "",
        startTime: "",
    });
    const [vehicles, setVehicles] = useState<any[]>([]);
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const searchVehicles = async () => {
        try {
            const res = await API.get("/vehicles/available", { params: form });
            setVehicles(res.data);
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Error searching vehicles");
        }
    };

    const bookVehicle = async (vehicleId: string) => {
        try {
            await API.post("/bookings", {
                vehicleId,
                fromPincode: form.fromPincode,
                toPincode: form.toPincode,
                startTime: form.startTime,
                customerId: "cust123" // hardcoded for now
            });
            setMessage("Booking successful!");
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Error booking vehicle");
        }
    };

    return (
        <div>
            <h2 className="text-xl mb-2">Search & Book Vehicle</h2>
            <div className="space-y-2">
                <input name="capacityRequired" placeholder="Capacity Required" value={form.capacityRequired} onChange={handleChange} className="border p-2" />
                <input name="fromPincode" placeholder="From Pincode" value={form.fromPincode} onChange={handleChange} className="border p-2" />
                <input name="toPincode" placeholder="To Pincode" value={form.toPincode} onChange={handleChange} className="border p-2" />
                <input type="datetime-local" name="startTime" value={form.startTime} onChange={handleChange} className="border p-2" />
                <button onClick={searchVehicles} className="bg-green-500 text-white px-4 py-2">Search</button>
            </div>

            {vehicles.length > 0 && (
                <div className="mt-4 space-y-2">
                    {vehicles.map((v) => (
                        <VehicleCard key={v._id} vehicle={v} onBook={() => bookVehicle(v._id)} />
                    ))}
                </div>
            )}

            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}

export default SearchBook;
