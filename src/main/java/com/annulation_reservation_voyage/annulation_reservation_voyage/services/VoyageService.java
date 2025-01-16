package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationCancelByAgenceDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageDetailsDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyagePreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.mappers.VoyageMapper;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.ClassVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.LigneVoyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Passager;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Vehicule;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.ClassVoyageRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.LigneVoyageRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.PassagerRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.ReservationRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.UserRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.VoyageRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.PaginationUtils;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class VoyageService {

    private final VoyageRepository voyageRepository;

    private final LigneVoyageRepository ligneVoyageRepository;

    private final VoyageMapper voyageMapper;

    private final UserRepository userRepository;

    private final ClassVoyageRepository classVoyageRepository;

    private final VehiculeService vehiculeService;

    private final ReservationRepository reservationRepository;

    private final ReservationService reservationService;

    private final PassagerRepository passagerRepository;

    public Page<Voyage> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Slice<Voyage> slice = voyageRepository.findAll(pageable);
        long total = voyageRepository.count();
        return PaginationUtils.SliceToPage(slice, total);
    }

    public Page<VoyagePreviewDTO> findAllPreview(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Slice<Voyage> voyagesSlice = voyageRepository.findAll(pageable);
        // Récupère tous les voyages et les traite en un flux
        List<VoyagePreviewDTO> previewVoyageList = voyagesSlice.stream()
                .map(voyage -> {
                    // Récupère la première ligne de voyage associée
                    LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());

                    ClassVoyage classVoyage = classVoyageRepository.findById(ligneVoyage.getIdClassVoyage())
                            .orElse(null);

                    // Trouve l'agence associée et mappe les informations si présente
                    return userRepository.findById(ligneVoyage.getIdAgenceVoyage())
                            .map(agenceVoyage -> voyageMapper.toVoyagePreviewDTO(voyage, agenceVoyage, classVoyage))
                            .orElse(null); // Retourne null si aucune agence n'est trouvée
                })
                .filter(Objects::nonNull) // Exclut les valeurs null
                .collect(Collectors.toList()); // Convertit en liste

        long total = previewVoyageList.size();

        return PaginationUtils.ContentToPage(previewVoyageList, pageable, total);
    }

    public VoyageDetailsDTO findById(UUID id) {

        Voyage voyage = voyageRepository.findById(id).orElse(null);
        if (voyage != null) {
            LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());
            ClassVoyage classVoyage = classVoyageRepository.findById(ligneVoyage.getIdClassVoyage()).orElse(null);
            User agenceVoyage = userRepository.findById(ligneVoyage.getIdAgenceVoyage()).orElse(null);
            Vehicule vehicule = this.vehiculeService.findById(ligneVoyage.getIdVehicule());
            List<Integer> placesReservees = new ArrayList<>();
            List<Reservation> reservations = reservationRepository.findByIdVoyage(voyage.getIdVoyage());
            for (Reservation reservation : reservations) {
                List<Passager> passagers = passagerRepository.findAllByIdReservation(reservation.getIdReservation());
                for (Passager passager : passagers) {
                    placesReservees.add(passager.getPlaceChoisis());
                }
            }
            return voyageMapper.tovoyageDetailsDTO(voyage, agenceVoyage, classVoyage, vehicule, placesReservees);
        }
        return null;
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

    public double annulerVoyage(VoyageCancelDTO voyageCancelDTO) {

        // On cherche le voyage
        Voyage voyage = voyageRepository.findById(voyageCancelDTO.getIdVoyage()).orElseThrow(
                () -> new RuntimeException("Le voyage dont l'id est donné n'existe pas")
        );

        // on cherche la liste des reservations de ce voyage
        List<Reservation> reservations = reservationRepository.findByIdVoyage(voyage.getIdVoyage());

        double risque = 0.0;

        for (Reservation reservation : reservations) {
            // on effectue l'annulation
            ReservationCancelByAgenceDTO reservationCancelByAgenceDTO = new ReservationCancelByAgenceDTO();
            reservationCancelByAgenceDTO.setVoyage(voyage);
            reservationCancelByAgenceDTO.setIdReservation(reservation.getIdReservation());
            reservationCancelByAgenceDTO.setCanceled(voyageCancelDTO.isCanceled());
            reservationCancelByAgenceDTO.setCauseAnnulation(voyageCancelDTO.getCauseAnnulation());
            reservationCancelByAgenceDTO.setOrigineAnnulation(voyageCancelDTO.getOrigineAnnulation());

            risque += reservationService.annulerReservationByAgence(reservationCancelByAgenceDTO);

        }

        return risque;
    }

}
