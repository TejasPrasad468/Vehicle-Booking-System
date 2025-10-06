"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ENDPOINTS } from "@/config/api";

const BookingPage: React.FC = () => {
  const searchParams = useSearchParams();
  const [bookingData, setBookingData] = useState({
    vehicleNumber: "",
    driverName: "",
    driverPhone: "",
    capacity: 0,
    startTime: "",
    endTime: "",
    fromPincode: "",
    toPincode: "",
    customerName: "",   // new field
    customerPhone: "",  // new field
  });

  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (searchParams) {
      setBookingData((prev) => ({
        ...prev,
        vehicleNumber: searchParams.get("vehicleNumber") || "",
        driverName: searchParams.get("driverName") || "",
        driverPhone: searchParams.get("driverPhone") || "",
        capacity: Number(searchParams.get("capacity")) || 0,
        startTime: searchParams.get("startTime") || "",
        endTime: searchParams.get("endTime") || "",
        fromPincode: searchParams.get("fromPincode") || "",
        toPincode: searchParams.get("toPincode") || "",
      }));
    }
  }, [searchParams]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleConfirmBooking = async () => {
    if (!bookingData.customerName || !bookingData.customerPhone) {
      setMessage("Please enter customer name and phone number.");
      return;
    }

    try {
      const payload = {
        vehicleId: bookingData.vehicleNumber,
        bookingData: {
          customerName: bookingData.customerName,
          customerPhone: bookingData.customerPhone,
          startTime: new Date(bookingData.startTime).toISOString(),
          endTime: new Date(bookingData.endTime).toISOString(),
          fromPincode: bookingData.fromPincode,
          toPincode: bookingData.toPincode,
        },
      };

      console.log("Booking payload:", payload);

      // const response = await fetch("http://localhost:5000/api/vehicles/bookings", {
      const response = await fetch(ENDPOINTS.bookings, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setMessage("✅ Booking confirmed successfully!");
      } else {
        const errorData = await response.json();
        setMessage(`Booking failed: ${errorData.message || "Unknown error"}`);
      }
    } catch (error: any) {
      setMessage(`Booking failed: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Confirm Booking</h1>

      <div className="space-y-2">
        <p>Vehicle: {bookingData.vehicleNumber}</p>
        <p>Driver: {bookingData.driverName}</p>
        <p>Driver Phone: {bookingData.driverPhone}</p>
        <p>Capacity: {bookingData.capacity}</p>
        <p>Start Time: {bookingData.startTime}</p>
        <p>End Time: {bookingData.endTime}</p>
        <p>From: {bookingData.fromPincode}</p>
        <p>To: {bookingData.toPincode}</p>

        {/* New input fields */}
        <input
          type="text"
          name="customerName"
          placeholder="Customer Name"
          value={bookingData.customerName}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded mt-2"
        />
        <input
          type="text"
          name="customerPhone"
          placeholder="Customer Phone"
          value={bookingData.customerPhone}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded mt-2"
        />
      </div>

      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600 w-full"
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </button>

      {message && (
        <p
          className={`mt-4 text-center font-medium ${
            message.startsWith("✅") ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
};

export default BookingPage;
