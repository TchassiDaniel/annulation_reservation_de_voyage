package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements;

import lombok.Data;

@Data
public class PayInData {
  String message;
  int status_code;
  String transaction_code;
  TransactionStatus transaction_status;
}
