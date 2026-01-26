package com.app.service;

import com.app.entity.Booking;
import com.app.entity.Charger;
import com.app.repository.BookingRepository;
import com.app.repository.ChargerRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ChargerRepository chargerRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              ChargerRepository chargerRepository) {
        this.bookingRepository = bookingRepository;
        this.chargerRepository = chargerRepository;
    }

    @Override
    @Transactional
    public Booking saveBooking(Booking booking) {

        Charger charger = chargerRepository.findById(
                booking.getCharger().getChargerId()
        ).orElseThrow(() -> new RuntimeException("Charger not found"));

        if (!"FREE".equals(charger.getAvailabilityStatus())) {
            throw new RuntimeException("Charger already booked");
        }

        charger.setAvailabilityStatus("BOOKED");
        chargerRepository.save(charger);

        booking.setStatus("BOOKED");
        return bookingRepository.save(booking);
    }

    @Override
    public Booking getBookingById(Integer bookingId) {
        return bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));
    }

    @Override
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}
