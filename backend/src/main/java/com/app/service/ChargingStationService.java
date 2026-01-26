package com.app.service;

import com.app.entity.ChargingStation;
import java.util.List;
import java.util.Optional;

public interface ChargingStationService {

    ChargingStation saveStation(ChargingStation station);

    Optional<ChargingStation> getStationById(Integer stationId);

    List<ChargingStation> getAllStations();
}
