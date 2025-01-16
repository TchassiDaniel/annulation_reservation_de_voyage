package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import java.time.Duration;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.DurationConverter;
import org.springframework.data.cassandra.core.mapping.CassandraType;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.Convert;

@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PolitiqueAnnulation {
  @PrimaryKey
  private UUID idPolitique;

  private List<TauxPeriode> listeTauxPeriode;

  @Convert(converter = DurationConverter.class)
  private Duration dureeCoupon;

  private UUID idAgenceVoyage;
}
