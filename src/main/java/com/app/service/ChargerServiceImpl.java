package com.app.service;

import com.app.entity.Charger;
import com.app.repository.ChargerRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ChargerServiceImpl implements ChargerService {

    private final ChargerRepository chargerRepository;

    public ChargerServiceImpl(ChargerRepository chargerRepository) {
        this.chargerRepository = chargerRepository;
    }

    @Override
    public Charger saveCharger(Charger charger) {
        return chargerRepository.save(charger);
    }

    @Override
    public Charger getChargerById(Integer id) {
        return chargerRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Charger not found"));
    }

    @Override
    public List<Charger> getAllChargers() {
        return chargerRepository.findAll();
    }
}
