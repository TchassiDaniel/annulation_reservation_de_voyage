package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationConfirmDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutCoupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Coupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Historique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.CouponRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.HistoriqueRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.ReservationRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.VoyageRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ReservationService {

    public final ReservationRepository reservationRepository;
    public final HistoriqueRepository historiqueRepository;
    public final CouponRepository couponRepository;
    public final VoyageRepository voyageRepository;

    public List<Reservation> findAll() {
        return reservationRepository.findAll();
    }

    public Reservation findById(UUID id) {
        return reservationRepository.findById(id).orElse(null);
    }

    public Reservation create(ReservationDTO reservationDTO) {

        Reservation reservation = new Reservation();
        reservation.setIdReservation(UUID.randomUUID());
        reservation.setDateReservation(LocalDateTime.now());
        reservation.setStatutReservation(StatutReservation.RESERVER);
        reservation.setIdUser(reservationDTO.getIdUser());
        reservation.setIdVoyage(reservationDTO.getIdVoyage());
        reservation.setNbrPassager(reservationDTO.getNbrPassager());
        reservation.setPrixTotal(reservationDTO.getPrixTotal());

        Voyage voyage = this.voyageRepository.findById(reservation.getIdVoyage()).get();
        voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() + reservation.getNbrPassager());
        voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() - reservation.getNbrPassager());
        this.voyageRepository.save(voyage);

        return reservationRepository.save(reservation);
    }

    public Reservation update(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void delete(UUID id) {
        reservationRepository.deleteById(id);
    }

    public void confirmerReservation(ReservationConfirmDTO reservationConfirmDTO) {
        // On update la reservation
        Optional<Reservation> reservationOpt = this.reservationRepository
                .findById(reservationConfirmDTO.getIdReservation());
        if (reservationOpt.isEmpty()) {
            throw new RuntimeException("Reservation non existante");
        }

        Reservation reservation = reservationOpt.get();
        reservation.setDateConfirmation(LocalDateTime.now());
        reservation.setStatutReservation(StatutReservation.CONFIRMER);
        this.reservationRepository.save(reservation);
        // On crée l'historique
        Historique historique = new Historique();
        historique.setIdHistorique(UUID.randomUUID());
        historique.setDateConfirmation(LocalDateTime.now());
        historique.setDateReservation(reservation.getDateReservation());
        historique.setIdReservation(reservation.getIdReservation());
        historique.setStatusHistorique(StatutHistorique.VALIDER);
        this.historiqueRepository.save(historique);
        // On deduis le nombre de reservation restante
        Voyage voyage = this.voyageRepository.findById(reservation.getIdVoyage()).get();
        // voyage.setNbrPlaceRestante(voyage.getNbrPlaceRestante() -
        // reservation.getNbrPassager());
        voyage.setNbrPlaceConfirm(voyage.getNbrPlaceConfirm() + reservation.getNbrPassager());
        this.voyageRepository.save(voyage);
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