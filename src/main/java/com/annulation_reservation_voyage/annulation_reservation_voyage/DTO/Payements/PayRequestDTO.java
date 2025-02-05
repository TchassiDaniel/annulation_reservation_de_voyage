package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements;

import java.util.UUID;

import lombok.Data;

@Data
public class PayRequestDTO {
  String mobilePhone;
  String mobilePhoneName;
  double amount;
  UUID userId;
  UUID reservationId;
}
