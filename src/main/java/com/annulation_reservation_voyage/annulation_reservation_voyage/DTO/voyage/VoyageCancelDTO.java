package com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.UUID;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class VoyageCancelDTO {
    private String causeAnnulation;
    private String origineAnnulation;
    private UUID IdVoyage;
    private boolean canceled;
}
