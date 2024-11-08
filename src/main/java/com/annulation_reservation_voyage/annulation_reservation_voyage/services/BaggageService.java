package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Baggage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.BaggageRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class BaggageService {

    private final BaggageRepository baggageRepository;

    public BaggageService(BaggageRepository baggageRepository) {
        this.baggageRepository = baggageRepository;
    }

    public List<Baggage> findAll() {
        return baggageRepository.findAll();
    }

    public Baggage findById(UUID id) {
        return baggageRepository.findById(id).orElse(null);
    }

    public Baggage create(Baggage baggage) {
        return baggageRepository.save(baggage);
    }

    public Baggage update(Baggage baggage) {
        return baggageRepository.save(baggage);
    }

    public void delete(UUID id) {
        baggageRepository.deleteById(id);
    }
}
