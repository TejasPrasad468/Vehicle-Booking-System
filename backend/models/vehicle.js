const mongoose = require("mongoose");

const bookedSchema = new mongoose.Schema({
  customerName : { type: String, required: true},
  customerPhone: { type: String, required: true },
  startTime: { type: Date, required: true },
  endTime: { type: Date, required: true },
  fromPincode: { type: String, required: true },
  toPincode: { type: String, required: true }
}, { _id: false }); // _id false to avoid extra ids for subdocuments
// console.log()

const vehicleSchema = new mongoose.Schema({
  vehicleNumber: {
    type: String,
    required: true,
    unique: true
  },
  capacityNo: {
    type: Number,
    required: true
  },
  driverName: {
    type: String,
    required: true
  },
  driverPhone: {
    type: String,
    required: true
  },
  isBooked: {
    type: [bookedSchema], // array of bookings
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Vehicle", vehicleSchema);
