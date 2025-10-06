const Vehicle = require("../models/vehicle");

const allVehicles = async () => {
  return await Vehicle.find();
};
// console.log()

const createVehicle = async (data) => {
  const vehicle = new Vehicle(data);
  return await vehicle.save();
};

const addNewBookingInVehicle = async (vehicleId, bookingData) => {
  try {
    if (!vehicleId) {
      throw new Error("Vehicle ID is required");
    }

    if (!bookingData || !bookingData.startTime || !bookingData.endTime) {
      throw new Error("Booking data with startTime and endTime is required");
    }

    const vehicle = await Vehicle.findOne({ vehicleNumber: vehicleId });
    if (!vehicle) {
      throw new Error(`Vehicle with ID ${vehicleId} not found`);
    }
    console.log("Vehicle found =", vehicle.vehicleNumber);

    const { customerName, customerPhone, startTime, endTime, fromPincode, toPincode } = bookingData;

    // Validate booking fields
    if (!customerName || !customerPhone || !fromPincode || !toPincode) {
      throw new Error("All booking fields (customerName, customerPhone, fromPincode, toPincode) are required");
    }

    const start = new Date(startTime);
    const end = new Date(endTime);
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new Error("Invalid startTime or endTime");
    }

    // Check for time conflicts
    const isConflict = vehicle.isBooked.some(
      (b) => start < new Date(b.endTime) && end > new Date(b.startTime)
    );

    if (isConflict) {
      throw new Error("Vehicle already booked for this time range");
    }

    // Add new booking
    const newBooking = { customerName, customerPhone, startTime: start, endTime: end, fromPincode, toPincode };
    vehicle.isBooked.push(newBooking);
    await vehicle.save();

    console.log("✅ Booking saved for:", vehicle.vehicleNumber);
    return { success: true, vehicle, booking: newBooking };
  } 
  catch (error) {
    console.error("Error adding new booking:", error.message);
    // Throw error to be handled in route/controller
    throw new Error(error.message || "Failed to add booking");
  }
};

const getAllAvailableVehicles = async ({ requiredCapacity, startTime, endTime }) => {
  console.log("here4")
  console.log(requiredCapacity);
  const vehicles = await Vehicle.find({ capacityNo: { $gte: requiredCapacity } });
    console.log("here5")

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
