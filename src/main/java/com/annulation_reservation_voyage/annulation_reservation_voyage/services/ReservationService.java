package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationConfirmDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutCoupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.*;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.*;

import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.PaginationUtils;
import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final HistoriqueRepository historiqueRepository;
    private final CouponRepository couponRepository;
    private final VoyageRepository voyageRepository;
    private final LigneVoyageRepository ligneVoyageRepository;
    private final ClassVoyageRepository classVoyageRepository;

    public ReservationService(ReservationRepository reservationRepository, HistoriqueRepository historiqueRepository, CouponRepository couponRepository
    , VoyageRepository voyageRepository, LigneVoyageRepository ligneVoyageRepository, ClassVoyageRepository classVoyageRepository){
        this.couponRepository = couponRepository;
        this.reservationRepository = reservationRepository;
        this.historiqueRepository = historiqueRepository;
        this.voyageRepository = voyageRepository;
        this.ligneVoyageRepository = ligneVoyageRepository;
        this.classVoyageRepository = classVoyageRepository;
    }

    public Page<Reservation> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Slice<Reservation> slice = reservationRepository.findAll(pageable);
        long total = reservationRepository.count();
        return PaginationUtils.SliceToPage(slice, total);
    }

    public Reservation findById(UUID id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public Reservation create(ReservationDTO reservationDTO) {
        // Récupérer la date et l'heure actuelles
        LocalDateTime now = LocalDateTime.now();

        // Vérifier si le voyage existe
        Voyage voyage = voyageRepository.findById(reservationDTO.getIdVoyage())
                .orElseThrow(() -> new RuntimeException("Le voyage dont l'id est spécifié n'existe pas."));

        // Vérifier que la date actuelle est inférieure à la date limite de reservation du voyage
        if (now.isAfter(voyage.getDateLimiteReservation())) {
            throw new RuntimeException("La date de réservation doit être antérieure à la date limite de reservation du voyage.");
        }

        // Vérifier qu'il y a suffisamment de places reservable
        if (voyage.getNbrPlaceReservable() < reservationDTO.getNbrPassager()) {
            throw new RuntimeException("Il n'y a pas suffisamment de places disponibles pour ce voyage.");
        }

        LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());
        ClassVoyage classVoyage = classVoyageRepository.findById(ligneVoyage.getIdClassVoyage()).orElse(null);


        // Créer la réservation
        Reservation reservation = new Reservation();
        reservation.setIdReservation(UUID.randomUUID());
        reservation.setDateReservation(now);
        reservation.setStatutReservation(StatutReservation.RESERVER);
        reservation.setIdUser(reservationDTO.getIdUser());
        reservation.setIdVoyage(reservationDTO.getIdVoyage());
        reservation.setNbrPassager(reservationDTO.getNbrPassager());
        reservation.setMontantPaye(reservationDTO.getMontantPaye());
        reservation.setPrixTotal(reservationDTO.getNbrPassager() * classVoyage.getPrix());

        // Mettre à jour le nombre de places réservées et réservables
        voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() + reservation.getNbrPassager());
        voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() - reservation.getNbrPassager());
        voyageRepository.save(voyage);

        // Enregistrer la réservation
        return reservationRepository.save(reservation);
    }

    public Reservation update(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void delete(UUID id) {
        reservationRepository.deleteById(id);
    }

    public Reservation confirmerReservation(ReservationConfirmDTO reservationConfirmDTO) {
        // Récupérer la date et l'heure actuelles
        LocalDateTime now = LocalDateTime.now();

        // On update la reservation
        Reservation reservation = this.reservationRepository.findById(reservationConfirmDTO.getIdReservation())
                .orElseThrow(() -> new RuntimeException("La Reservation n'existe pas"));

        Voyage voyage = voyageRepository.findById(reservation.getIdVoyage()).orElse(null);

        // Vérifier que la date actuelle est inférieure à la date limite de confirmation du voyage
        if (now.isAfter(voyage.getDateLimiteConfirmation())) {
            throw new RuntimeException("La date de confirmation doit être antérieure à la date limite de confirmation du voyage.");
        }

        // Vérifier qu'il y a suffisamment de places reservable
        if (voyage.getNbrPlaceRestante() < reservation.getNbrPassager()) {
            throw new RuntimeException("Il n'y a pas suffisamment de places libre pour confirmation");
        }

        //verifier que le prix total a été payé
        if (reservation.getMontantPaye() + reservationConfirmDTO.getMontantPaye() < reservation.getPrixTotal())
        {
            throw new RuntimeException("Le prix total pour le voyage n'est pas complet");
        }

        reservation.setDateConfirmation(now);
        reservation.setMontantPaye(reservationConfirmDTO.getMontantPaye() + reservation.getMontantPaye());
        reservation.setStatutReservation(StatutReservation.CONFIRMER);
        // gestion des places
        voyage.setNbrPlaceRestante(voyage.getNbrPlaceRestante() - reservation.getNbrPassager());
        voyage.setNbrPlaceConfirm(voyage.getNbrPlaceConfirm() + reservation.getNbrPassager());
        this.voyageRepository.save(voyage);
        // On crée l'historique
        Historique historique = new Historique();
        historique.setIdHistorique(UUID.randomUUID());
        historique.setDateConfirmation(LocalDateTime.now());
        historique.setDateReservation(reservation.getDateReservation());
        historique.setIdReservation(reservation.getIdReservation());
        historique.setStatusHistorique(StatutHistorique.VALIDER);
        this.historiqueRepository.save(historique);
        return this.reservationRepository.save(reservation);
    }

    public void annulerReservation(ReservationCancelDTO reservationCancelDTO) {
        // On update la reservation
        Optional<Reservation> reservationOpt = this.reservationRepository
                .findById(reservationCancelDTO.getIdReservation());
        if (reservationOpt.isEmpty()) {
            throw new RuntimeException("Reservation non existante");
        }

        Reservation reservation = reservationOpt.get();
        Voyage voyage = this.voyageRepository.findById(reservation.getIdVoyage()).get();
        // On crée l'historique
        Historique historique = new Historique();
        historique.setIdHistorique(UUID.randomUUID());
        historique.setDateAnnulation(LocalDateTime.now());
        historique.setDateReservation(reservation.getDateReservation());
        historique.setIdReservation(reservation.getIdReservation());
        historique.setStatusHistorique(reservationCancelDTO.getStatusHistorique());
        historique.setCauseAnnulation(reservationCancelDTO.getCauseAnnulation());
        historique.setCompensation(0);
        historique.setTauxAnnulation(0);
        historique.setOrigineAnnulation(reservationCancelDTO.getOrigineAnnulation());

        // On gère le nombre de place reserve dans le voyage
        if (historique.getStatusHistorique() == StatutHistorique.ANNULER_PAR_USAGER_APRES_CONFIRMATION
                || historique.getStatusHistorique() == StatutHistorique.ANNULER_PAR_USAGER_APRES_RESERVATION) {
            voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() - reservation.getNbrPassager());
            voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() + reservation.getNbrPassager());
        }

        // On cree le coupon si l'annulation c'est faite après la confirmation
        if (reservation.getStatutReservation() == StatutReservation.CONFIRMER) {
            Coupon coupon = new Coupon();
            coupon.setIdCoupon(UUID.randomUUID());
            coupon.setDateDebut(LocalDateTime.now());
            coupon.setDateFin(LocalDateTime.now().plusYears(1));
            coupon.setStatusCoupon(StatutCoupon.VALIDE);
            coupon.setIdHistorique(historique.getIdHistorique());
            // Si c'est l'agence qui annule alors...
            if (reservationCancelDTO.getStatusHistorique() == StatutHistorique.ANNULER_PAR_AGENCE_APRES_CONFIRMATION) {
                coupon.setValeur(reservationCancelDTO.getCompensation());
                historique.setCompensation(reservationCancelDTO.getCompensation());
            } else {
                coupon.setValeur(reservation.getPrixTotal() * reservationCancelDTO.getTauxAnnulation());
                historique.setTauxAnnulation(reservationCancelDTO.getTauxAnnulation());
                // On augmente le nombre de reservation restante
                voyage.setNbrPlaceConfirm(voyage.getNbrPlaceConfirm() - reservation.getNbrPassager());
            }
            // On enregistre le coupon
            this.couponRepository.save(coupon);
        }

        historique = this.historiqueRepository.save(historique);

        reservation.setStatutReservation(StatutReservation.ANNULER);
        this.voyageRepository.save(voyage);
        this.reservationRepository.save(reservation);
    }
}

// TODO gerer la modification des places dans le voyages