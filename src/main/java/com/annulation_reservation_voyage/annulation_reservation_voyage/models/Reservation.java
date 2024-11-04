package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.LocalDateTime;
import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Reservation {
  private UUID idReservation;
  private LocalDateTime dateReservation;
  private LocalDateTime dateConfirmation;
  private int nbrPassager;
  private float prixTotal;
  private StatutReservation statutReservation;
}

