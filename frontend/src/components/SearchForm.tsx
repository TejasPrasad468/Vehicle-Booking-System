"use client"
import React, { useState, ChangeEvent, FormEvent } from "react";

// SearchForm.tsx
export interface Filters {
  capacity: number;       // number instead of string (matches your API)
  startTime: string;
  endTime: string;        // <-- Add this line
  fromPincode: string;
  toPincode: string;
}


interface SearchFormProps {
  onSearch: (filters: Filters) => void;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [filters, setFilters] = useState<Filters>({
    capacity: 0,
    startTime: "",
    endTime: "",          // <-- Add this
    fromPincode: "",
    toPincode: "",
  });


  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSearch(filters);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-white shadow rounded">
      <input
        type="number"
        name="capacity"
        placeholder="Capacity"
        value={filters.capacity}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <input
        type="time"
        name="startTime"
        placeholder="Start Time"
        value={filters.startTime}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        name="fromPincode"
        placeholder="From Pincode"
        value={filters.fromPincode}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <input
        type="text"
        name="toPincode"
        placeholder="To Pincode"
        value={filters.toPincode}
        onChange={handleChange}
        className="border p-2 rounded w-full"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;
