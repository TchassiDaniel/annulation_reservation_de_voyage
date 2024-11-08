package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Usager;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.UsagerRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class UsagerService {

    private final UsagerRepository usagerRepository;

    public UsagerService(UsagerRepository usagerRepository) {
        this.usagerRepository = usagerRepository;
    }

    public List<Usager> findAll() {
        return usagerRepository.findAll();
    }

    public Usager findById(UUID id) {
        return usagerRepository.findById(id).orElse(null);
    }

    public Usager create(Usager usager) {
        return usagerRepository.save(usager);
    }

    public Usager update(Usager usager) {
        return usagerRepository.save(usager);
    }

    public void delete(UUID id) {
        usagerRepository.deleteById(id);
    }
}
