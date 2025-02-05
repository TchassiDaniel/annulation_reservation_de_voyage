package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements;

import lombok.Data;

@Data
public class StatusData {
  String transaction_ref;
  String payee_id;
  String payee_name;
  double transaction_amount;
  double transaction_fees;
  String transaction_currency;
  String payer_reference;
  String payer_name;
  String payer_email;
  String payer_phone;
  String transaction_method;
  String app_transaction_reference;
  TransactionStatus status;
}
