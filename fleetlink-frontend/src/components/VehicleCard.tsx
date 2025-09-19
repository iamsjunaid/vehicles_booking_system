import type { Vehicle } from "../types";

type Props = {
    vehicle: Vehicle;
    onBook: () => void;
};

function VehicleCard({ vehicle, onBook }: Props) {
    return (
        <div className="p-3 rounded border border-gray-200 shadow-sm bg-gray-50">
            <h3 className="font-bold">{vehicle.name}</h3>
            <p>Capacity: {vehicle.capacityKg} kg</p>
            <p>Tyres: {vehicle.tyres}</p>
            <p>Estimated Duration: {vehicle.estimatedRideDurationHours}h</p>
            <button onClick={onBook} className="mt-2 bg-blue-500 text-white w-full rounded px-3 py-1">Click to Book Now</button>
        </div>
    );
}

export default VehicleCard;
