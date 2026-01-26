import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { getOwnerStations, addStation } from "../api/ownerApi";

function OwnerDashboard() {
  // TEMP: replace with logged-in ownerId from auth later
  const ownerId = 2;

  const [stations, setStations] = useState([]);
  const [message, setMessage] = useState("");

  const [newStation, setNewStation] = useState({
    station_name: "",
    address: "",
    city: "",
    state: "",
    latitude: "",
    longitude: "",
  });

  // Fetch owner stations
  useEffect(() => {
    loadStations();
  }, []);

  const loadStations = () => {
    getOwnerStations(ownerId)
      .then((res) => setStations(res.data))
      .catch((err) => console.error(err));
  };

  // Add station
  const handleAddStation = (e) => {
    e.preventDefault();

    const payload = {
      ...newStation,
      owner_id: ownerId,
      approval_status: "PENDING",
    };

    addStation(payload)
      .then(() => {
        setMessage("Station added successfully (Pending approval)");
        setNewStation({
          station_name: "",
          address: "",
          city: "",
          state: "",
          latitude: "",
          longitude: "",
        });
        loadStations();
      })
      .catch((err) => {
        console.error(err);
        setMessage("Failed to add station");
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container flex-grow-1 py-4">
        <h2 className="fw-bold mb-4">Owner Dashboard</h2>

        {/* ADD STATION */}
        <div className="card shadow-sm mb-4">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Add New Station</h5>

            {message && <div className="alert alert-info">{message}</div>}

            <form onSubmit={handleAddStation} className="row g-3">
              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Station Name"
                  value={newStation.station_name}
                  onChange={(e) =>
                    setNewStation({ ...newStation, station_name: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-6">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Address"
                  value={newStation.address}
                  onChange={(e) =>
                    setNewStation({ ...newStation, address: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="City"
                  value={newStation.city}
                  onChange={(e) =>
                    setNewStation({ ...newStation, city: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  placeholder="State"
                  value={newStation.state}
                  onChange={(e) =>
                    setNewStation({ ...newStation, state: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  placeholder="Latitude"
                  value={newStation.latitude}
                  onChange={(e) =>
                    setNewStation({ ...newStation, latitude: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-2">
                <input
                  type="number"
                  step="any"
                  className="form-control"
                  placeholder="Longitude"
                  value={newStation.longitude}
                  onChange={(e) =>
                    setNewStation({ ...newStation, longitude: e.target.value })
                  }
                  required
                />
              </div>

              <div className="col-md-12">
                <button type="submit" className="btn btn-primary w-100">
                  Add Station
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* STATION LIST */}
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="fw-bold mb-3">Your Stations</h5>

            {stations.length === 0 ? (
              <p className="text-muted">No stations added yet</p>
            ) : (
              <div className="table-responsive">
                <table className="table table-bordered align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>City</th>
                      <th>State</th>
                      <th>Latitude</th>
                      <th>Longitude</th>
                      <th>Status</th>
                      <th>Created At</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stations.map((st) => (
                      <tr key={st.station_id}>
                        <td>{st.station_name}</td>
                        <td>{st.city}</td>
                        <td>{st.state}</td>
                        <td>{st.latitude}</td>
                        <td>{st.longitude}</td>
                        <td>
                          <span
                            className={`badge ${
                              st.approval_status === "APPROVED"
                                ? "bg-success"
                                : "bg-warning"
                            }`}
                          >
                            {st.approval_status}
                          </span>
                        </td>
                        <td>{new Date(st.created_at).toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default OwnerDashboard;
