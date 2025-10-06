import React from "react";
import { useRouter } from "next/router";

export interface Vehicle {
  _id: string;
  vehicleNumber: string;
  capacityNo: number;
  driverName: string;
  driverPhone: string;
  isBooked: string[];
}

interface VehicleCardProps {
  vehicle: Vehicle;
  filters: {
    startTime: string;
    endTime: string;
    capacity: number;
    fromPincode: string;
    toPincode: string;
  };
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, filters }) => {
  const router = useRouter();

  const handleBook = () => {
    // Navigate to booking page with state/data
    router.push({
      pathname: "/booking",
      query: {
        vehicleNumber: vehicle.vehicleNumber,
        driverName: vehicle.driverName,
        driverPhone: vehicle.driverPhone,
        capacity: filters.capacity,
        startTime: filters.startTime,
        endTime: filters.endTime,
        fromPincode: filters.fromPincode,
        toPincode: filters.toPincode,
      },
    });
  };

  const isAvailable = vehicle.isBooked.length === 0;

  return (
    <div className="border rounded shadow p-4 space-y-2 bg-white">
      <h3 className="font-bold text-lg">Vehicle: {vehicle.vehicleNumber}</h3>
      <p>Driver: {vehicle.driverName}</p>
      <p>Driver Number: {vehicle.driverPhone}</p>
      <p>Capacity: {vehicle.capacityNo}</p>
      <button
        className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        onClick={handleBook}
        disabled={!isAvailable}
      >
        Book this vehicle
      </button>
    </div>
  );
};

export default VehicleCard;
