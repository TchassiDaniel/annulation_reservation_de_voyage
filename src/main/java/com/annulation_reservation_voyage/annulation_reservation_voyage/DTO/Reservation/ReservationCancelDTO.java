package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ReservationCancelDTO {
  private String causeAnnulation;
  private String origineAnnulation;
  private UUID idReservation;
}
