package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.PolitiqueAnnulation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.PolitiqueAnnulationRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class PolitiqueAnnulationService {

    private final PolitiqueAnnulationRepository politiqueAnnulationRepository;

    public PolitiqueAnnulationService(PolitiqueAnnulationRepository politiqueAnnulationRepository) {
        this.politiqueAnnulationRepository = politiqueAnnulationRepository;
    }

    public List<PolitiqueAnnulation> findAll() {
        return politiqueAnnulationRepository.findAll();
    }

    public PolitiqueAnnulation findById(UUID id) {
        return politiqueAnnulationRepository.findById(id).orElse(null);
    }

    public PolitiqueAnnulation create(PolitiqueAnnulation politiqueAnnulation) {
        return politiqueAnnulationRepository.save(politiqueAnnulation);
    }

    public PolitiqueAnnulation update(PolitiqueAnnulation politiqueAnnulation) {
        return politiqueAnnulationRepository.save(politiqueAnnulation);
    }

    public void delete(UUID id) {
        politiqueAnnulationRepository.deleteById(id);
    }
}
