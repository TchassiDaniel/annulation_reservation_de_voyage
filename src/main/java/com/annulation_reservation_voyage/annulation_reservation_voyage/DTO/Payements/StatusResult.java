package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements;

import lombok.Data;

@Data
public class StatusResult {
  ResultStatus status;
  String message;
  StatusData data;
  String errors;
  boolean ok;
}
