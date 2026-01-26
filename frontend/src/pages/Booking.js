// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import Footer from "../components/Footer";

// function Booking() {
//   const [bookingTime, setBookingTime] = useState("");
//   const [endTime, setEndTime] = useState("");

//   const handleBooking = (e) => {
//     e.preventDefault();

//     // UI only (backend later)
//     const bookingData = {
//       booking_time: bookingTime,
//       end_time: endTime,
//       status: "BOOKED",
//     };

//     console.log("Booking Data:", bookingData);
//     alert("Booking UI submitted (backend not connected yet)");
//   };

//   return (
//     <div className="d-flex flex-column min-vh-100 bg-light">
//       <Navbar />

//       {/* BODY */}
//       <div className="container flex-grow-1 d-flex align-items-center">
//         <div className="row w-100 justify-content-center">

//           {/* LEFT INFO PANEL */}
//           <div className="col-md-6 d-none d-md-flex align-items-center">
//             <div>
//               <h1 className="fw-bold text-success">
//                 Book Your Charging Slot
//               </h1>
//               <p className="text-muted fs-5">
//                 Reserve EV chargers instantly at verified stations.
//               </p>
//               <ul className="list-unstyled mt-3">
//                 <li>✔ Live charger scheduling</li>
//                 <li>✔ Safe & secure booking</li>
//                 <li>✔ Hassle-free EV charging</li>
//               </ul>
//             </div>
//           </div>

//           {/* BOOKING CARD */}
//           <div className="col-md-5">
//             <div className="card shadow-lg border-0 rounded-4">
//               <div className="card-body p-4">

//                 <h3 className="text-center fw-bold mb-3">
//                   EV Charger Booking
//                 </h3>

//                 <form onSubmit={handleBooking}>

//                   {/* BOOKING TIME */}
//                   <div className="mb-3">
//                     <label className="form-label">Start Time</label>
//                     <input
//                       type="datetime-local"
//                       className="form-control"
//                       value={bookingTime}
//                       onChange={(e) => setBookingTime(e.target.value)}
//                       required
//                     />
//                   </div>

//                   {/* END TIME */}
//                   <div className="mb-3">
//                     <label className="form-label">End Time</label>
//                     <input
//                       type="datetime-local"
//                       className="form-control"
//                       value={endTime}
//                       onChange={(e) => setEndTime(e.target.value)}
//                       required
//                     />
//                   </div>

//                   {/* STATUS */}
//                   <div className="mb-3">
//                     <label className="form-label">Status</label>
//                     <input
//                       type="text"
//                       className="form-control"
//                       value="BOOKED"
//                       disabled
//                     />
//                   </div>

//                   <button
//                     type="submit"
//                     className="btn btn-success w-100 mt-2"
//                   >
//                     Confirm Booking
//                   </button>

//                 </form>

//               </div>
//             </div>
//           </div>

//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// }

// export default Booking;


import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Otp from "./Otp";

function Booking() {
  const [bookingTime, setBookingTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [showOtp, setShowOtp] = useState(false);

  const handleBooking = (e) => {
    e.preventDefault();

    // UI only
    const bookingData = {
      booking_time: bookingTime,
      end_time: endTime,
      status: "BOOKED",
    };

    console.log("Booking Data:", bookingData);
    setShowOtp(true); // OPEN OTP POPUP
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <Navbar />

      <div className="container flex-grow-1 d-flex align-items-center">
        <div className="row w-100 justify-content-center">

          {/* LEFT INFO PANEL */}
          <div className="col-md-6 d-none d-md-flex align-items-center">
            <div>
              <h1 className="fw-bold text-success">
                Book Your Charging Slot
              </h1>
              <p className="text-muted fs-5">
                Reserve EV chargers instantly at verified stations.
              </p>
              <ul className="list-unstyled mt-3">
                <li>✔ Live charger scheduling</li>
                <li>✔ Safe & secure booking</li>
                <li>✔ Hassle-free EV charging</li>
              </ul>
            </div>
          </div>

          {/* BOOKING CARD */}
          <div className="col-md-5">
            <div className="card shadow-lg border-0 rounded-4">
              <div className="card-body p-4">

                <h3 className="text-center fw-bold mb-3">
                  EV Charger Booking
                </h3>

                <form onSubmit={handleBooking}>

                  <div className="mb-3">
                    <label className="form-label">Start Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={bookingTime}
                      onChange={(e) => setBookingTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">End Time</label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Status</label>
                    <input
                      type="text"
                      className="form-control"
                      value="BOOKED"
                      disabled
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success w-100 mt-2"
                  >
                    Confirm Booking
                  </button>

                </form>

              </div>
            </div>
          </div>

        </div>
      </div>

      <Footer />

      {/* OTP POPUP */}
      <Otp show={showOtp} onClose={() => setShowOtp(false)} />
    </div>
  );
}

export default Booking;
