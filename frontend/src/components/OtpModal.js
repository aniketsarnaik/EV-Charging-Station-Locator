import React, { useState } from "react";
import { generateOtp, verifyOtp } from "../api/otpApi";

function OtpModal({ bookingId }) {
  const [otpId, setOtpId] = useState(null);
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const handleGenerateOtp = async () => {
    try {
      const response = await generateOtp(bookingId);
      setOtpId(response.data.otpId);
      setMessage("OTP sent to your email");
    } catch (err) {
      setMessage("Failed to generate OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await verifyOtp(otpId, otp);
      setMessage("OTP verified. Charging started.");
    } catch (err) {
      setMessage("Invalid OTP");
    }
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "20px", marginTop: "20px" }}>
      <h3>OTP Verification</h3>

      <button onClick={handleGenerateOtp}>
        Start Charging (Generate OTP)
      </button>

      <br /><br />

      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      <br /><br />

      <button onClick={handleVerifyOtp}>Verify OTP</button>

      <p>{message}</p>
    </div>
  );
}

export default OtpModal;
