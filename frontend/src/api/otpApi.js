import api from "./axios";

export const generateOtp = (bookingId) => {
  return api.post("/otp", {
    bookingId: bookingId,
    otpType: "START_CHARGING",
  });
};

export const verifyOtp = (otpId, otpCode) => {
  return api.post("/otp/verify", {
    otpId: otpId,
    otpCode: otpCode,
  });
};
