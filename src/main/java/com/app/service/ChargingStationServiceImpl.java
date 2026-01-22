package com.app.service;

import com.app.entity.ChargingStation;
import com.app.repository.ChargingStationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ChargingStationServiceImpl implements ChargingStationService {

    private final ChargingStationRepository chargingStationRepository;

    public ChargingStationServiceImpl(ChargingStationRepository chargingStationRepository) {
        this.chargingStationRepository = chargingStationRepository;
    }

    @Override
    public ChargingStation saveStation(ChargingStation station) {
        return chargingStationRepository.save(station);
    }

    @Override
    public Optional<ChargingStation> getStationById(Integer stationId) {
        return chargingStationRepository.findById(stationId);
    }

    @Override
    public List<ChargingStation> getAllStations() {
        return chargingStationRepository.findAll();
    }
}
