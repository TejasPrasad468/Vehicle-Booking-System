require('dotenv').config();
export const API_BASE_URL = process.env.BACKEND_API || "https://vehicle-booking-system.onrender.com/";

// Optional: define endpoints
export const ENDPOINTS = {
  vehicles: `${API_BASE_URL}/vehicles`,
  bookings: `${API_BASE_URL}/vehicles/bookings`,
  availableVehicles: `${API_BASE_URL}/vehicles/available`,
  userCreate : `${API_BASE_URL}/users/create`,
  getUser : `${API_BASE_URL}/users/getuser`
};
