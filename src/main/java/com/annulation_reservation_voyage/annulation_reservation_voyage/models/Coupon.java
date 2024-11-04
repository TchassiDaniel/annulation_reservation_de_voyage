package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.LocalDateTime;
import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutCoupon;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coupon {
  private UUID idCoupon;
  private LocalDateTime dateDebut;
  private LocalDateTime dateFin;
  private StatutCoupon statusCoupon;
  private float valeur;
}

