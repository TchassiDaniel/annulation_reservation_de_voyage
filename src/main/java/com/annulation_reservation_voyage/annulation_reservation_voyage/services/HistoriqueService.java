package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Historique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.HistoriqueRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class HistoriqueService {

    private final HistoriqueRepository historiqueRepository;

    public HistoriqueService(HistoriqueRepository historiqueRepository) {
        this.historiqueRepository = historiqueRepository;
    }

    public Historique findById(UUID id) {
        return historiqueRepository.findById(id).orElse(null);
    }

    public List<Historique> findAll() {
        return historiqueRepository.findAll();
    }

    public Historique create(Historique historique) {
        return historiqueRepository.save(historique);
    }

    public Historique update(Historique historique) {
        return historiqueRepository.save(historique);
    }

    public void delete(UUID id) {
        historiqueRepository.deleteById(id);
    }
}
