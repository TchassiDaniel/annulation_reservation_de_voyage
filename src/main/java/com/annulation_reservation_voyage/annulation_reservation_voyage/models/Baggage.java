package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.UUID;

import jakarta.persistence.Entity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Baggage {
  private UUID idBaggage;
}

