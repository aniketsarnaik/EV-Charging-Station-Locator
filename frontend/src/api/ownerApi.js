import api from "./axios";

// Get all stations for the owner
export const getOwnerStations = (ownerId) => {
  return api.get(`/stations/owner/${ownerId}`);
};

// Add a new station
export const addStation = (station) => {
  return api.post("/stations", station);
};

// Update station status (optional)
export const updateStation = (stationId, data) => {
  return api.put(`/stations/${stationId}`, data);
};