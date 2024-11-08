package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Passager;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.PassagerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PassagerService {

    private final PassagerRepository passagerRepository;

    public PassagerService(PassagerRepository passagerRepository) {
        this.passagerRepository = passagerRepository;
    }

    public List<Passager> findAll() {
        return passagerRepository.findAll();
    }

    public Passager findById(UUID id) {
        return passagerRepository.findById(id).orElse(null);
    }

    public Passager create(Passager passager) {
        return passagerRepository.save(passager);
    }

    public Passager update(Passager passager, UUID id) {
        return passagerRepository.save(passager);
    }

    public void delete(UUID id) {
        passagerRepository.deleteById(id);
    }
}
