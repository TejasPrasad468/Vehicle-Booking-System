"use client"
import React, { useState } from "react";
import SearchForm, { Filters } from "@/components/SearchForm";
import VehicleCard, { Vehicle } from "@/components/vehicleCard";
import axios from "axios";

const VehicleSearchPage: React.FC = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [filters, setFilters] = useState<Filters>({
    capacity: 0,
    startTime: "",
    endTime: "",      // <-- add this line
    fromPincode: "",
    toPincode: "",
    });

  const [loading, setLoading] = useState(false);

  const handleSearch = async (searchFilters: Filters) => {
    try {
      setLoading(true);
      setFilters(searchFilters);

      const res = await axios.post<{
        filters: any;
        vehicles: Vehicle[];
      }>("/api/vehicles/search", { filters: searchFilters });

      setVehicles(res.data.vehicles);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Search Vehicles</h1>
      <SearchForm onSearch={handleSearch} />

      {loading && <p className="mt-4">Loading...</p>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {vehicles.map((v) => (
          <VehicleCard key={v._id} vehicle={v} filters={filters} />
        ))}
      </div>
    </div>
  );
};

export default VehicleSearchPage;
