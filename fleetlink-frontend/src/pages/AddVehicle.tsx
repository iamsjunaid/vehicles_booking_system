import { useState } from "react";
import API from "../services/api";

function AddVehicle() {
    const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await API.post("/vehicles", {
                name: form.name,
                capacityKg: Number(form.capacityKg),
                tyres: Number(form.tyres),
            });
            setMessage("Vehicle added successfully!");
            setForm({ name: "", capacityKg: "", tyres: "" });
        } catch (err: any) {
            setMessage(err.response?.data?.message || "Error adding vehicle");
        }
    };

    return (
        <div>
            <h2 className="text-xl mb-2">Add Vehicle</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="border p-2" />
                <input name="capacityKg" placeholder="Capacity (Kg)" value={form.capacityKg} onChange={handleChange} className="border p-2" />
                <input name="tyres" placeholder="Tyres" value={form.tyres} onChange={handleChange} className="border p-2" />
                <button type="submit" className="bg-blue-500 text-white px-4 py-2">Add</button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}

export default AddVehicle;
