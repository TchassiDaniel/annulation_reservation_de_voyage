package com.annulation_reservation_voyage.annulation_reservation_voyage.utils;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.PolitiqueAnnulation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.TauxPeriode;

import java.util.Date;
import java.util.List;

public class AnnulationOperator {

    public static double tauxannualtion(double tauxClassVoyage, PolitiqueAnnulation politiqueAnnulation, Date dateLimReservation, Date dateLimConfirmation, Date now){
        double dateLimReservattionDouble = dateLimReservation.getTime() / 1000.0;
        double dateLimConfirmationDouble = dateLimConfirmation.getTime() / 1000.0;
        double nowDouble = now.getTime() / 1000.0;
        double tauxDateAnnulation = (nowDouble - dateLimReservattionDouble) / (dateLimConfirmationDouble - dateLimReservattionDouble);
        double tauxPolitique = 0.0;
        for (TauxPeriode politique : politiqueAnnulation.getListeTauxPeriode()) {
            double startDate = politique.getDateDebut().getTime() / 1000.0;
            double endDate = politique.getDateFin().getTime() / 1000.0;
            if (startDate < nowDouble && endDate > nowDouble) {
                tauxPolitique = politique.getTaux();
            }
            break;
        }

        // le model mathematique utilisé pour l'heure est une moyenne empirique des taux
        return (tauxDateAnnulation + tauxClassVoyage + tauxPolitique) / 3.0;

    }

    public static double tauxCompensation(double tauxClassVoyage, PolitiqueAnnulation politiqueAnnulation, Date dateLimReservation, Date dateLimConfirmation, Date now){
        double dateLimReservattionDouble = dateLimReservation.getTime() / 1000.0;
        double dateLimConfirmationDouble = dateLimConfirmation.getTime() / 1000.0;
        double nowDouble = now.getTime() / 1000.0;
        double tauxDateAnnulation = (nowDouble - dateLimReservattionDouble) / (dateLimConfirmationDouble - dateLimReservattionDouble);
        double tauxPolitique = 0.0;
        for (TauxPeriode politique : politiqueAnnulation.getListeTauxPeriode()) {
            double startDate = politique.getDateDebut().getTime() / 1000.0;
            double endDate = politique.getDateFin().getTime() / 1000.0;
            if (startDate < nowDouble && endDate > nowDouble) {
                tauxPolitique = politique.getCompensation();
            }
            break;
        }

        // le model mathematique utilisé pour l'heure est une moyenne empirique des taux
        return (tauxDateAnnulation + tauxClassVoyage + tauxPolitique) / 3.0;
    }
}
