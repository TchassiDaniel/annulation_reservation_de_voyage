package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation;

import java.time.LocalDateTime;
import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCancelDTO {
  StatutHistorique statusHistorique;
  String causeAnnulation;
  String origineAnnulation;
  double tauxAnnulation;// Ce qu'on donne à l'utilisateur s'il annule la reservation
  double compensation;// Si l'agence annule on te donne ça
  UUID idReservation;
}
