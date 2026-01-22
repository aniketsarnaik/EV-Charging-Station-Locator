package com.app.repository;

import com.app.entity.Charger;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ChargerRepository
        extends JpaRepository<Charger, Integer> {
}
