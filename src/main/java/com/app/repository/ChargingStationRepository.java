package com.app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.app.entity.ChargingStation;

public interface ChargingStationRepository extends JpaRepository<ChargingStation, Integer> {
}
