package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.PrimaryKey;
import org.springframework.data.cassandra.core.mapping.Table;

import java.util.UUID;

@Table
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Vehicule {
    @PrimaryKey
    private UUID idVehicule;
    private String nom;
    private String modele;
    private int nbrPlaces;
    private UUID idAgenceVoyage;
}
