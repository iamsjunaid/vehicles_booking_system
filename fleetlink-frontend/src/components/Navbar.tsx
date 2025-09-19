import { FaTruck } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="flex justify-between items-center p-2 bg-white border-b-2 border-gray-200">
            <div className="flex items-center space-x-2">
                <FaTruck size={20} color="#4A90E2" />
                <span className="font-semibold text-[#4A90E2]">FleetLink</span>
            </div>
            <div className="flex items-center space-x-2">
                <FaRegUserCircle size={30} color="#4A90E2" />
            </div>
        </div>
    )
}
export default Navbar
