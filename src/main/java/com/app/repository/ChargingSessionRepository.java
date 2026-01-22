package com.app.repository;

import com.app.entity.ChargingSession;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChargingSessionRepository
        extends JpaRepository<ChargingSession, Integer> {
}
