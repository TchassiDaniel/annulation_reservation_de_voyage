package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements;

import lombok.Data;

@Data
public class PayInResult {
  ResultStatus status;
  String message;
  PayInData data;
  PayInErrors errors;
  boolean ok;
}
