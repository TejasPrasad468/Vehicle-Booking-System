const vehicleService = require("../services/vehicleService");

const getAllVehicles = async (req, res) => {
  try {
    const vehicles = await vehicleService.allVehicles();
    res.status(200).json(vehicles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const createVehicle = async (req, res) => {
  try {
    const vehicle = await vehicleService.createVehicle(req.body);
    res.status(201).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const addBooking = async (req, res) => {
  try {
    const {vehicleId} = req.body;
    const {bookingData} = req.body; 
    const vehicle = await vehicleService.addNewBookingInVehicle(vehicleId, bookingData);
    res.status(200).json(vehicle);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getAvailableVehicles = async (req, res) => {
  try {
    const filters = req.body; 
    
    const startTime = new Date(filters.startTime);
    const estimatedRideDurationHours = Math.abs(
      parseInt(filters.toPincode) - parseInt(filters.fromPincode)
    ) % 24;
    const endTime = new Date(startTime.getTime() + estimatedRideDurationHours * 60 * 60 * 1000);

    const vehicles = await vehicleService.getAllAvailableVehicles({
      requiredCapacity: parseInt(filters.requiredCapacity),
      startTime,
      endTime,
      fromPincode: filters.fromPincode,
      toPincode: filters.toPincode
    });

    res.status(200).json({
      filters: {
        startTime: startTime.toISOString(),
        endTime: endTime.toISOString(),
        capacity: filters.requiredCapacity,
        fromPincode: filters.fromPincode,
        toPincode: filters.toPincode
      },
      vehicles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


module.exports = {
  getAllVehicles,
  createVehicle,
  addBooking,
  getAvailableVehicles
};
