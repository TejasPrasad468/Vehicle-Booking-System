import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const BookingPage: React.FC = () => {
  const router = useRouter();
  const [bookingData, setBookingData] = useState({
    vehicleNumber: "",
    driverName: "",
    driverPhone: "",
    capacity: 0,
    startTime: "",
    endTime: "",
    fromPincode: "",
    toPincode: "",
  });

  useEffect(() => {
    if (router.isReady) {
      const query = router.query;
      setBookingData({
        vehicleNumber: query.vehicleNumber as string,
        driverName: query.driverName as string,
        driverPhone: query.driverPhone as string,
        capacity: Number(query.capacity),
        startTime: query.startTime as string,
        endTime: query.endTime as string,
        fromPincode: query.fromPincode as string,
        toPincode: query.toPincode as string,
      });
    }
  }, [router.isReady, router.query]);

  const handleConfirmBooking = () => {
    alert(`Booking confirmed for vehicle ${bookingData.vehicleNumber}`);
    // Call booking API here
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
      </div>
      <button
        className="bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-600"
        onClick={handleConfirmBooking}
      >
        Confirm Booking
      </button>
    </div>
  );
};

export default BookingPage;
