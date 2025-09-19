import { useEffect, useState } from "react";
import API from "../services/api";
import { FaTruck } from "react-icons/fa";
import { AxiosError } from "axios";

function AddVehicle() {
    const [form, setForm] = useState({ name: "", capacityKg: "", tyres: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    useEffect(() => {
        if (!message) return;
        const timer = setTimeout(() => setMessage(""), 3000);
        return () => clearTimeout(timer);
    }, [message]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.name || !form.capacityKg || !form.tyres) {
            setMessage("Please fill in all fields");
            return;
        }
        try {
            await API.post("/vehicles", {
                name: form.name,
                capacityKg: Number(form.capacityKg),
                tyres: Number(form.tyres),
            });
            setMessage("Vehicle added successfully!");
            setForm({ name: "", capacityKg: "", tyres: "" });
        } catch (err: unknown) {
            if (err instanceof AxiosError) {
                setMessage(err.response?.data?.message || "Error adding vehicle");
            } else {
                setMessage("Unexpected error occurred");
            }
        }
    };

    return (
        <div className="p-4 rounded bg-white w-1/2 shadow h-1/2">
            <h2 className="text-xl flex space-x-4 items-center">
                <span className="mr-2"><FaTruck /></span>Add Vehicle
            </h2>
            <p className="text-gray-600 mb-2 text-sm">Add a new vehicle to the fleet</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                    className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded h-12 p-2 w-full"
                />

                <div className="flex justify-left items-center mt-2 space-x-2">
                    <input
                        type="number"
                        max={100000}
                        name="capacityKg"
                        placeholder="Capacity (Kg)"
                        value={form.capacityKg}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded h-12 p-2"
                    />
                    <input
                        type="number"
                        max={18}
                        name="tyres"
                        placeholder="No. of Tyres"
                        value={form.tyres}
                        onChange={handleChange}
                        required
                        className="bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded h-12 p-2"
                    />
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white px-4 py-2 w-full mt-2 rounded"
                >
                    Add
                </button>
            </form>
            {message && <p className="mt-2">{message}</p>}
        </div>
    );
}

export default AddVehicle;
