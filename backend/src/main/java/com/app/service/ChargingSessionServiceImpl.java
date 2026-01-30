//package com.app.service;
//
//import com.app.entity.Booking;
//import com.app.entity.Charger;
//import com.app.entity.ChargingSession;
//import com.app.repository.BookingRepository;
//import com.app.repository.ChargerRepository;
//import com.app.repository.ChargingSessionRepository;
//import jakarta.transaction.Transactional;
//import org.springframework.stereotype.Service;
//
//import java.sql.Timestamp;
//import java.util.List;
//
//@Service
//public class ChargingSessionServiceImpl implements ChargingSessionService {
//
//    private final ChargingSessionRepository chargingSessionRepository;
//    private final BookingRepository bookingRepository;
//    private final ChargerRepository chargerRepository;
//
//    public ChargingSessionServiceImpl(
//            ChargingSessionRepository chargingSessionRepository,
//            BookingRepository bookingRepository,
//            ChargerRepository chargerRepository) {
//        this.chargingSessionRepository = chargingSessionRepository;
//        this.bookingRepository = bookingRepository;
//        this.chargerRepository = chargerRepository;
//    }
//
//    @Override
//    public ChargingSession saveChargingSession(ChargingSession session) {
//        return chargingSessionRepository.save(session);
//    }
//
//    @Override
//    public List<ChargingSession> getAllChargingSessions() {
//        return chargingSessionRepository.findAll();
//    }
//
//    // ✅ USED WHEN START OTP IS VERIFIED
//    @Override
//    @Transactional
//    public void startChargingSession(Integer bookingId) {
//
//        Booking booking = bookingRepository.findById(bookingId)
//                .orElseThrow(() -> new RuntimeException("Booking not found"));
//
//        // Create charging session
//        ChargingSession session = new ChargingSession();
//        session.setBooking(booking);
//        session.setStartTime(new Timestamp(System.currentTimeMillis()));
//        session.setSessionStatus("IN_PROGRESS");
//
//        chargingSessionRepository.save(session);
//
//        // Update charger status
//        Charger charger = booking.getCharger();
//        charger.setAvailabilityStatus("IN_USE");
//        chargerRepository.save(charger);
//    }
//
//    // ✅ USED FOR END CHARGING (END OTP / OWNER STOP)
//    @Override
//    @Transactional
//    public ChargingSession endSession(Integer sessionId) {
//
//        ChargingSession session = chargingSessionRepository.findById(sessionId)
//                .orElseThrow(() -> new RuntimeException("Session not found"));
//
//        session.setEndTime(new Timestamp(System.currentTimeMillis()));
//        session.setSessionStatus("COMPLETED");
//
//        Charger charger = session.getBooking().getCharger();
//        charger.setAvailabilityStatus("FREE");
//        chargerRepository.save(charger);
//
//        return chargingSessionRepository.save(session);
//    }
//
//	@Override
//	public ChargingSession startSession(Integer bookingId) {
//		// TODO Auto-generated method stub
//		return null;
//	}
//}

package com.app.service;

import com.app.entity.Booking;
import com.app.entity.Charger;
import com.app.entity.ChargingSession;
import com.app.repository.BookingRepository;
import com.app.repository.ChargerRepository;
import com.app.repository.ChargingSessionRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.List;

@Service
public class ChargingSessionServiceImpl implements ChargingSessionService {

    private final ChargingSessionRepository chargingSessionRepository;
    private final BookingRepository bookingRepository;
    private final ChargerRepository chargerRepository;

    public ChargingSessionServiceImpl(
            ChargingSessionRepository chargingSessionRepository,
            BookingRepository bookingRepository,
            ChargerRepository chargerRepository) {
        this.chargingSessionRepository = chargingSessionRepository;
        this.bookingRepository = bookingRepository;
        this.chargerRepository = chargerRepository;
    }

    @Override
    public ChargingSession saveChargingSession(ChargingSession session) {
        return chargingSessionRepository.save(session);
    }

    @Override
    public List<ChargingSession> getAllChargingSessions() {
        return chargingSessionRepository.findAll();
    }

    // ✅ START CHARGING
    @Override
    @Transactional
    public void startChargingSession(Integer bookingId) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        ChargingSession session = new ChargingSession();
        session.setBooking(booking);
        session.setStartTime(new Timestamp(System.currentTimeMillis()));
        session.setSessionStatus("IN_PROGRESS");

        chargingSessionRepository.save(session);

        Charger charger = booking.getCharger();
        charger.setAvailabilityStatus("IN_USE");
        chargerRepository.save(charger);
    }

    // ✅ END CHARGING (ONLY FIX HERE)
    @Override
    @Transactional
    public ChargingSession endSession(Integer sessionId) {

        ChargingSession session = chargingSessionRepository.findById(sessionId)
                .orElseThrow(() -> new RuntimeException("Session not found"));

        session.setEndTime(new Timestamp(System.currentTimeMillis()));
        session.setSessionStatus("COMPLETED");

        Charger charger = session.getBooking().getCharger();
        charger.setAvailabilityStatus("FREE");
        chargerRepository.save(charger);

        // 🔥 THIS WAS MISSING
        Booking booking = session.getBooking();
        booking.setStatus("COMPLETED");
        bookingRepository.save(booking);

        return chargingSessionRepository.save(session);
    }


    @Override
    public ChargingSession startSession(Integer bookingId) {
        return null;
    }
}
