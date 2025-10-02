const Vehicle = require("../models/vehicle");

const allVehicles = async () => {
  return await Vehicle.find();
};

const createVehicle = async (data) => {
  const vehicle = new Vehicle(data);
  return await vehicle.save();
};

const addNewBookingInVehicle = async (vehicleId, bookingData) => {
  const vehicle = await Vehicle.findById(vehicleId);
  if (!vehicle) throw new Error("Vehicle not found");

  const { startTime, endTime, fromPincode, toPincode } = bookingData;

  const isConflict = vehicle.isBooked.some(b =>
    (new Date(startTime) < b.endTime && new Date(endTime) > b.startTime)
  );

  if (isConflict) {
    throw new Error("Vehicle already booked for this time range");
  }

  vehicle.isBooked.push({ startTime, endTime, fromPincode, toPincode });
  await vehicle.save();
  return vehicle;
};

const getAllAvailableVehicles = async ({ requiredCapacity, startTime, endTime }) => {
  const vehicles = await Vehicle.find({ capacityKg: { $gte: requiredCapacity } });

  const availableVehicles = vehicles.filter(vehicle => {
    const hasConflict = vehicle.isBooked.some(b =>
      (new Date(startTime) < new Date(b.endTime) && new Date(endTime) > new Date(b.startTime))
    );
    return !hasConflict;
  });

  return availableVehicles;
};


module.exports = {
  allVehicles,
  createVehicle,
  addNewBookingInVehicle,
  getAllAvailableVehicles
};
