import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Otp({ show, onClose }) {
  const [startOtp, setStartOtp] = useState("");
  const [endOtp, setEndOtp] = useState("");
  const [showEndOtp, setShowEndOtp] = useState(false);

  const navigate = useNavigate();

  const validateStartOtp = () => {
    // UI only
    if (startOtp.length === 4) {
      setShowEndOtp(true);
      alert("Start OTP validated (UI only)");
    } else {
      alert("Enter valid Start OTP");
    }
  };

  const validateEndOtp = () => {
    // UI only
    if (endOtp.length === 4) {
      alert("End OTP validated (UI only)");
      navigate("/customer");
    } else {
      alert("Enter valid End OTP");
    }
  };

  if (!show) return null;

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
    >
      <div className="card shadow-lg border-0 rounded-4 p-4" style={{ width: "380px" }}>
        <h4 className="text-center fw-bold mb-3">OTP Verification</h4>

        {/* START OTP */}
        <div className="mb-3">
          <label className="form-label">Start OTP</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Start OTP"
            value={startOtp}
            onChange={(e) => setStartOtp(e.target.value)}
          />
        </div>

        {!showEndOtp && (
          <button
            className="btn btn-primary w-100 mb-3"
            onClick={validateStartOtp}
          >
            Verify Start OTP
          </button>
        )}

        {/* END OTP */}
        {showEndOtp && (
          <>
            <div className="mb-3">
              <label className="form-label">End OTP</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter End OTP"
                value={endOtp}
                onChange={(e) => setEndOtp(e.target.value)}
              />
            </div>

            <button
              className="btn btn-success w-100"
              onClick={validateEndOtp}
            >
              Verify End OTP
            </button>
          </>
        )}

        <button
          className="btn btn-link text-danger mt-3"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Otp;
