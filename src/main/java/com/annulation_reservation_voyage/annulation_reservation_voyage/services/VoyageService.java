package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyagePreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.mappers.VoyageMapper;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.LigneVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.LigneVoyageRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.UserRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.VoyageRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VoyageService {

    private final VoyageRepository voyageRepository;

    private final LigneVoyageRepository ligneVoyageRepository;

    private final VoyageMapper voyageMapper;

    private final UserRepository userRepository;

    public VoyageService(VoyageRepository voyageRepository, LigneVoyageRepository ligneVoyageRepository,
            VoyageMapper voyageMapper, UserRepository userRepository) {
        this.voyageRepository = voyageRepository;
        this.ligneVoyageRepository = ligneVoyageRepository;
        this.voyageMapper = voyageMapper;
        this.userRepository = userRepository;
    }

    public List<Voyage> findAll() {
        return voyageRepository.findAll();
    }

    public List<VoyagePreviewDTO> findAllPreview() {
        // Récupère tous les voyages et les traite en un flux
        return voyageRepository.findAll().stream()
                .map(voyage -> {
                    // Récupère la première ligne de voyage associée
                    LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());

                    // Trouve l'agence associée et mappe les informations si présente
                    return userRepository.findById(ligneVoyage.getIdAgenceVoyage())
                            .map(agenceVoyage -> voyageMapper.toVoyagePreviewDTO(voyage, agenceVoyage))
                            .orElse(null); // Retourne null si aucune agence n'est trouvée
                })
                .filter(Objects::nonNull) // Exclut les valeurs null
                .collect(Collectors.toList()); // Convertit en liste
    }

    public Voyage findById(UUID id) {
        return voyageRepository.findById(id).orElse(null);
    }

    public Voyage create(Voyage voyage) {
        // on peut efectuer des actions spécifiques d'abord
        // On cree un id pour la ligne de voyage
        voyage.setIdVoyage(UUID.randomUUID());
        return voyageRepository.save(voyage);
    }

    public Voyage update(Voyage voyage) {
        // on peut effectuer des actions specifique d'abord
        return voyageRepository.save(voyage);
    }

    public void delete(UUID id) {
        voyageRepository.deleteById(id);
    }

}
