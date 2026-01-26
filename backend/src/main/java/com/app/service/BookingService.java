package com.app.service;

import com.app.entity.Booking;
import java.util.List;

public interface BookingService {

    Booking saveBooking(Booking booking);

    Booking getBookingById(Integer bookingId);

    List<Booking> getAllBookings();
}
