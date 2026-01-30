package com.app.service;

import com.app.dto.BookingRequestDto;
import com.app.entity.Booking;
import com.app.entity.Charger;
import com.app.entity.User;
import com.app.repository.BookingRepository;
import com.app.repository.ChargerRepository;
import com.app.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;


import java.sql.Timestamp;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepository;
    private final ChargerRepository chargerRepository;
    private final UserRepository userRepository;

    public BookingServiceImpl(BookingRepository bookingRepository,
                              ChargerRepository chargerRepository,
                              UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.chargerRepository = chargerRepository;
        this.userRepository = userRepository;
    }

    // ✅ USED BY FRONTEND (DTO-BASED)
    @Override
    @Transactional
    public Booking createBooking(BookingRequestDto request) {

        Charger charger = chargerRepository.findById(request.getChargerId())
                .orElseThrow(() -> new RuntimeException("Charger not found"));

        if (!"FREE".equals(charger.getAvailabilityStatus())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST,
                    "Charger already booked"
            );
        }
        

        User customer = userRepository.findById(request.getCustomerId())
                .orElseThrow(() -> new RuntimeException("Customer not found"));

        Booking booking = new Booking();
        booking.setCustomer(customer);
        booking.setCharger(charger);
        booking.setBookingTime(
                Timestamp.valueOf(request.getBookingTime())
        );
        booking.setStatus(request.getStatus());

        charger.setAvailabilityStatus("BOOKED");
        chargerRepository.save(charger);

        return bookingRepository.save(booking);
    }

    // ❌ EXISTING METHOD (UNCHANGED – FOR LEGACY / ADMIN USE)
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
    
    @Override
    public Booking getLatestBookingForCustomer(Integer customerId) {
        return bookingRepository
                .findByCustomer_UserIdOrderByBookingTimeDesc(customerId)
                .stream()
                .filter(b -> "BOOKED".equals(b.getStatus()))
                .findFirst()
                .orElse(null);
    }
    
    @Override
    public List<Booking> getBookingsForCustomer(Integer customerId) {
        return bookingRepository
            .findByCustomer_UserIdOrderByBookingTimeDesc(customerId);
    }


}
