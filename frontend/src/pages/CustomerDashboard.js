// import OtpModal from "../components/OtpModal";

// function CustomerDashboard() {
//   // TEMP bookingId for testing
//   const bookingId = 1;

//   return (
//     <div style={{ padding: "40px" }}>
//       <h1>Customer Dashboard</h1>

//       <p>Booking ID: {bookingId}</p>

//       <OtpModal bookingId={bookingId} />
//     </div>
//   );
// }

// export default CustomerDashboard;

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CustomerDashboard() {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">

      <Navbar />

      <div className="container mt-4 flex-grow-1">

        {/* WELCOME */}
        <div className="p-4 mb-4 bg-white rounded-4 shadow-sm">
          <h2 className="fw-bold">Welcome to EV Charge ⚡</h2>
          <p className="text-muted">
            Manage your EV charging activities from one place.
          </p>
        </div>

        {/* CUSTOMER DASHBOARD */}
        <div className="row g-4">

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="fw-bold">🔍 Find Stations</h5>
                <p className="text-muted">
                  Locate nearby charging stations on the map.
                </p>
                <a href="/map" className="btn btn-success btn-sm">
                  Open Map
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="fw-bold">📅 My Bookings</h5>
                <p className="text-muted">
                  View your past and active bookings.
                </p>
                <a href="/my-bookings" className="btn btn-primary btn-sm">
                  View Bookings
                </a>
              </div>
            </div>
          </div>

        </div>

      </div>

      <Footer />

    </div>
  );
}

export default CustomerDashboard;
