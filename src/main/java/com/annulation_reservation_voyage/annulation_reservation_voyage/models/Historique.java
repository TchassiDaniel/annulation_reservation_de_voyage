package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.LocalDateTime;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Historique {
  @PrimaryKey
  private UUID idHistorique;
  private StatutHistorique statusHistorique;
  private LocalDateTime dateReservation;
  private LocalDateTime dateConfirmation;
  private LocalDateTime dateAnnulation;
  private String causeAnnulation;
  private String origineAnnulation;
  private double tauxAnnulation;
  private double compensation;
}
