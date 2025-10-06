const express = require("express");
const router = express.Router();

const vehicleController = require("../controllers/vehicleController");

router.get("/", vehicleController.getAllVehicles);
// console.log()

router.post("/", vehicleController.createVehicle);

router.post("/bookings", vehicleController.addBooking);

router.post("/available", vehicleController.getAvailableVehicles);

module.exports = router;
