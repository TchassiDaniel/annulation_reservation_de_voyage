package com.annulation_reservation_voyage.annulation_reservation_voyage.models;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.cassandra.core.mapping.UserDefinedType;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@UserDefinedType
public class TauxPeriode implements Serializable {
    private Date dateDebut;
    private Date dateFin;
    private double taux;
    private double compensation;  // c'est aussi un taux (valeur entre 0 et 1) qui est utilisé lorsque c'est l'agence qui annule un voyage
}