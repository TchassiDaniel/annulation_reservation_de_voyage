package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.controllers.HistoriqueController;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Coupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Historique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.CouponRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.HistoriqueRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.ReservationRepository;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.UserRepository;

import lombok.AllArgsConstructor;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class CouponService {
    private final CouponRepository couponRepository;
    private final UserRepository userRepository;
    private final ReservationRepository reservationRepository;
    private final HistoriqueRepository historiqueRepository;

    public List<Coupon> findAll() {
        return couponRepository.findAll();
    }

    public Coupon findById(UUID id) {
        return couponRepository.findById(id).orElse(null);
    }

    public Coupon create(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public Coupon update(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public void delete(UUID id) {
        couponRepository.deleteById(id);
    }

    public List<Coupon> findByUserId(UUID userId) {

        List<Coupon> coupons = new ArrayList<Coupon>();

        List<Reservation> reservations = this.reservationRepository.findByIdUser(userId);
        for (Reservation reservation : reservations) {
            Historique historique = this.historiqueRepository.findByIdReservation(reservation.getIdReservation())
                    .orElseThrow(() -> new RuntimeException("L'historique associé à la reservation n'existe pas"));
            List<Coupon> coupon = this.couponRepository.findAllByIdHistorique(historique.getIdHistorique());
            coupons.addAll(coupon);
        }

        return coupons;
    }
}
