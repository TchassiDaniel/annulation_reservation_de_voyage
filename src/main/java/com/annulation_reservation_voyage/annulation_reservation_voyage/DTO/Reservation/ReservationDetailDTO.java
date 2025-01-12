package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation;

import java.util.List;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.PassagerDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Passager;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class ReservationDetailDTO extends Reservation {
  public ReservationDetailDTO(Reservation reservation) {
    // TODO Auto-generated constructor stub
  }

  private List<Passager> passager;
}
