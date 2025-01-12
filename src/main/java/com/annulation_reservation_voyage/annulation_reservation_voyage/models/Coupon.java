package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.util.Date;
import java.util.UUID;

import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutCoupon;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Coupon {
  @PrimaryKey
  private UUID idCoupon;
  private Date dateDebut;
  private Date dateFin;
  private StatutCoupon statusCoupon;
  private double valeur;
  private UUID idHistorique;
}
