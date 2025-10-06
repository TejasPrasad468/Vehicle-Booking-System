export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:5000/api";

// Optional: define endpoints
export const ENDPOINTS = {
  vehicles: `${API_BASE_URL}/vehicles`,
  bookings: `${API_BASE_URL}/vehicles/bookings`,
  availableVehicles: `${API_BASE_URL}/vehicles/available`,
  userCreate : `${API_BASE_URL}/users/create`,
  getUser : `${API_BASE_URL}/users/getuser`
};
