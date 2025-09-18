type Props = {
    vehicle: any;
    onBook: () => void;
};

function VehicleCard({ vehicle, onBook }: Props) {
    return (
        <div className="border p-3 rounded shadow">
            <h3 className="font-bold">{vehicle.name}</h3>
            <p>Capacity: {vehicle.capacityKg} kg</p>
            <p>Tyres: {vehicle.tyres}</p>
            <p>Estimated Duration: {vehicle.estimatedRideDurationHours}h</p>
            <button onClick={onBook} className="mt-2 bg-blue-500 text-white px-3 py-1">Book Now</button>
        </div>
    );
}

export default VehicleCard;
