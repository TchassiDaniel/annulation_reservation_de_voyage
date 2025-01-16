package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.User;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ReservationPreviewDTO {
  Reservation reservation;
  Voyage voyage;
}
