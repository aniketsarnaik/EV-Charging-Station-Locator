package com.app.repository;

import com.app.entity.Booking;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookingRepository
        extends JpaRepository<Booking, Integer> {
	List<Booking> findByCustomer_UserIdOrderByBookingTimeDesc(Integer userId);

	
}
