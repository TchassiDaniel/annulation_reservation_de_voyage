package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.LocalDateTime;
import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Historique {
  private UUID idHistorique;
  private StatutHistorique statusHistorique;
  private LocalDateTime dateReservation;
  private LocalDateTime dateConfirmation;
  private LocalDateTime dateAnnulation;
  private String causeAnnulation;
  private String origineAnnulation;
  private float tauxAnnulation;
  private float compensation;
}
