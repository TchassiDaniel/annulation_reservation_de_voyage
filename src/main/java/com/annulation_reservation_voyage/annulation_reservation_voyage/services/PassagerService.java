package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.BilletDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.PassagerDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDetailDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageDetailsDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Passager;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.PassagerRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

import javax.persistence.EntityNotFoundException;

@Service
@AllArgsConstructor
public class PassagerService {
    private final PassagerRepository passagerRepository;
    private final ReservationService reservationService;
    private final VoyageService voyageService;

    public List<Passager> findAll() {
        return passagerRepository.findAll();
    }

    public Passager findById(UUID id) {
        return passagerRepository.findById(id).orElse(null);
    }

    /*
     * public Passager create(PassagerDTO passagerDTO) {
     * Passager passager = new Passager();
     * passager.setIdPassager(UUID.randomUUID());
     * passager.setNumeroPieceIdentific(passagerDTO.getNumeroPieceIdentific());
     * passager.setNom(passagerDTO.getNom());
     * passager.setGenre(passagerDTO.getGenre());
     * passager.setAge(passagerDTO.getAge());
     * passager.setNbrBaggage(passagerDTO.getNbrBaggage());
     * // passager.setIdReservation(passagerDTO.getIdReservation());
     * return passagerRepository.save(passager);
     * }
     */

    public Passager update(Passager passager, UUID id) {
        return passagerRepository.save(passager);
    }

    public void delete(UUID id) {
        passagerRepository.deleteById(id);
    }

    public BilletDTO informationPourBillet(UUID idPassager) {
        // Récupérer le passager
        Passager passager = passagerRepository.findById(idPassager)
                .orElseThrow(() -> new EntityNotFoundException("Le passager dont l'id est spécifique n'existe pas."));

        // Récupérer la réservation du passager
        ReservationDetailDTO reservation = reservationService.findById(passager.getIdReservation());
        if (reservation == null) {
            throw new EntityNotFoundException("La réservation dont l'id est spécifique n'existe pas.");
        }

        // Récupérer les détails du voyage associés à la réservation
        VoyageDetailsDTO voyage = voyageService.findById(reservation.getReservation().getIdVoyage());
        if (voyage == null) {
            throw new EntityNotFoundException("Le voyage dont l'id est spécifique n'existe pas.");
        }

        // Construction du billet
        BilletDTO billet = new BilletDTO();
        billet.setTitre(voyage.getTitre());
        billet.setDescription(voyage.getDescription());
        billet.setDateDepartPrev(voyage.getDateDepartPrev());
        billet.setLieuDepart(voyage.getLieuDepart());
        billet.setDateDepartEffectif(voyage.getDateDepartEffectif());
        billet.setDateArriveEffectif(voyage.getDateArriveEffectif());
        billet.setLieuArrive(voyage.getLieuArrive());
        billet.setHeureDepartEffectif(voyage.getHeureDepartEffectif());
        billet.setHeureArrive(voyage.getHeureArrive());
        billet.setDureeVoyage(voyage.getDureeVoyage());
        billet.setStatusVoyage(voyage.getStatusVoyage());
        billet.setSmallImage(voyage.getSmallImage());
        billet.setBigImage(voyage.getBigImage());
        billet.setNomAgence(voyage.getNomAgence());
        billet.setPrix(voyage.getPrix());
        billet.setNomClasseVoyage(voyage.getNomClasseVoyage());
        billet.setPointDeDepart(voyage.getPointDeDepart());
        billet.setPointArrivee(voyage.getPointArrivee());
        billet.setNom(passager.getNom());
        billet.setGenre(passager.getGenre());
        billet.setAge(passager.getAge());
        billet.setNbrBaggage(passager.getNbrBaggage());
        billet.setNumeroPieceIdentific(passager.getNumeroPieceIdentific());

        return billet;
    }
}
