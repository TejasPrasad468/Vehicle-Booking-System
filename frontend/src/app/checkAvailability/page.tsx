"use client"
import React, { useState } from "react";
import SearchForm, { Filters } from "@/components/SearchForm";
import VehicleCard, { Vehicle } from "@/components/vehicleCard";
import axios from "axios";
import { ENDPOINTS } from "@/config/api";

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
      console.log("searchFilters " + searchFilters);

      const res = await axios.post<{
        filters: any;
        vehicles: Vehicle[];
      // }>("http://localhost:5000/api/vehicles/available", { filters: searchFilters });
      }>(ENDPOINTS.availableVehicles, { filters: searchFilters });
      console.log("res.data " + JSON.stringify(res.data.vehicles));
      setVehicles(res.data.vehicles);
      setFilters(res.data.filters);
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
