package com.app.service;

import com.app.entity.Charger;
import java.util.List;

public interface ChargerService {

    Charger saveCharger(Charger charger);

    Charger getChargerById(Integer id);

    List<Charger> getAllChargers();
}
