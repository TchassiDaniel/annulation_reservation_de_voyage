package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.AgenceVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.AgenceVoyageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class AgenceVoyageService {

    public final AgenceVoyageRepository agenceVoyageRepository;

    public AgenceVoyageService(AgenceVoyageRepository agenceVoyageRepository) {
        this.agenceVoyageRepository = agenceVoyageRepository;
    }

    public AgenceVoyage findById(UUID id) {
        return agenceVoyageRepository.findById(id).orElse(null);
    }

    public List<AgenceVoyage> findAll() {
        return agenceVoyageRepository.findAll();
    }

    public AgenceVoyage create(AgenceVoyage agenceVoyage) {
        return agenceVoyageRepository.save(agenceVoyage);
    }

    public AgenceVoyage update(AgenceVoyage agenceVoyage) {
        return agenceVoyageRepository.save(agenceVoyage);
    }

    public void delete(UUID id) {
        agenceVoyageRepository.deleteById(id);
    }
}
