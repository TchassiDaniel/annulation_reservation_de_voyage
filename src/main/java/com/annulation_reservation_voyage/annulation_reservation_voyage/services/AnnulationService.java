package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationCancelByAgenceDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutCoupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.*;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.*;
import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.AnnulationOperator;
import lombok.AllArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AnnulationService {

    private final ReservationRepository reservationRepository;
    private final VoyageRepository voyageRepository;
    private final HistoriqueRepository historiqueRepository;
    private final LigneVoyageRepository ligneVoyageRepository;
    private final ClassVoyageRepository classVoyageRepository;
    private final PassagerRepository passagerRepository;
    private final UserRepository userRepository;
    private final CouponRepository couponRepository;
    private final PolitiqueAnnulationRepository politiqueAnnulationRepository;
    private final SoldeIndemnisationRepository soldeIndemnisationRepository;

    public double annulerVoyage(VoyageCancelDTO voyageCancelDTO) {

        // On cherche le voyage
        Voyage voyage = voyageRepository.findById(voyageCancelDTO.getIdVoyage()).orElseThrow(
                () -> new RuntimeException("Le voyage dont l'id est donné n'existe pas")
        );

        // on cherche la liste des reservations de ce voyage
        List<Reservation> reservations = reservationRepository.findByIdVoyage(voyage.getIdVoyage());

        double risque = 0.0;

        for (Reservation reservation : reservations) {
            // on effectue l'annulation
            ReservationCancelByAgenceDTO reservationCancelByAgenceDTO = new ReservationCancelByAgenceDTO();
            reservationCancelByAgenceDTO.setVoyage(voyage);
            reservationCancelByAgenceDTO.setIdReservation(reservation.getIdReservation());
            reservationCancelByAgenceDTO.setCanceled(voyageCancelDTO.isCanceled());
            reservationCancelByAgenceDTO.setCauseAnnulation(voyageCancelDTO.getCauseAnnulation());
            reservationCancelByAgenceDTO.setOrigineAnnulation(voyageCancelDTO.getOrigineAnnulation());

            risque += this.annulerReservationByAgence(reservationCancelByAgenceDTO);

        }

        return risque;
    }

    public double annulerReservation(ReservationCancelDTO reservationCancelDTO) {
        // Récupérer la date et l'heure actuelles
        Date now = new Date();

        // On cherche la reservation
        Reservation reservation = this.reservationRepository.findById(reservationCancelDTO.getIdReservation())
                .orElseThrow(() -> new RuntimeException("La Reservation n'existe pas"));

        if (reservation.getStatutReservation() == StatutReservation.ANNULER) {
            throw new RuntimeException("cette reservation est déjà annulé");
        }

        // On récupère l'historique
        Historique historique = historiqueRepository.findByIdReservation(reservation.getIdReservation()).orElseThrow(
                () -> new RuntimeException("L'Historique associé à la reservation n'existe pas"));

        // on verifie qu'il n'ya pas plus de passager que dans la reservation
        List<Passager> passagersReservation = passagerRepository.findAllByIdReservation(reservation.getIdReservation());
        if (passagersReservation.size() < reservationCancelDTO.getIdPassagers().length) {
            throw new RuntimeException("Il y'a un passager en trop dans la requete d'annulation");
        }

        Voyage voyage = this.voyageRepository.findById(reservation.getIdVoyage()).get();
        LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());
        User agenceVoyage = userRepository.findById(ligneVoyage.getIdAgenceVoyage()).orElse(null);
        ClassVoyage classVoyage = classVoyageRepository.findById(ligneVoyage.getIdClassVoyage()).orElse(null);
        PolitiqueAnnulation politiqueAnnulation = politiqueAnnulationRepository
                .findByIdAgenceVoyage(agenceVoyage.getUserId());
        double montantSubstitut = 0.0; // montant sur lequel va être appliqué le model mathématique pour l'obtention du
        // coupon
        double montantPaye = reservation.getMontantPaye();

        for (int i = 0; i < reservationCancelDTO.getIdPassagers().length; i++) {
            // on detruit l'objet passager dans la BD
            if (reservationCancelDTO.isCanceled()) {
                passagerRepository.deleteById(reservationCancelDTO.getIdPassagers()[i]);
            }
            if (montantPaye >= classVoyage.getPrix()) {
                montantPaye -= classVoyage.getPrix();
                montantSubstitut += classVoyage.getPrix();
            } else if (montantPaye > 0) {
                montantSubstitut += montantPaye;
                montantPaye = 0;
            }
        }
        double tauxAnnulation = AnnulationOperator.tauxannualtion(classVoyage.getTauxAnnulation(), politiqueAnnulation,
                voyage.getDateLimiteReservation(), voyage.getDateLimiteConfirmation(), now);
        if (!reservationCancelDTO.isCanceled()) { // si canceled est à false, alors on veut juste evaluer combien on
            // risque perdre et on s'arrete là
            return tauxAnnulation;
        }

        // On update l'historique
        historique.setDateAnnulation(now);
        if (reservation.getStatutReservation() == StatutReservation.RESERVER) {
            historique.setStatusHistorique(StatutHistorique.ANNULER_PAR_USAGER_APRES_RESERVATION);
            voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() - reservationCancelDTO.getIdPassagers().length);
            voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() + reservationCancelDTO.getIdPassagers().length);
        } else if (reservation.getStatutReservation() == StatutReservation.CONFIRMER) {
            historique.setStatusHistorique(StatutHistorique.ANNULER_PAR_USAGER_APRES_CONFIRMATION);
            voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() - reservationCancelDTO.getIdPassagers().length);
            voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() + reservationCancelDTO.getIdPassagers().length);
            voyage.setNbrPlaceConfirm(voyage.getNbrPlaceReserve() - reservationCancelDTO.getIdPassagers().length);
            voyage.setNbrPlaceRestante(voyage.getNbrPlaceReservable() + reservationCancelDTO.getIdPassagers().length);
        }
        historique.setCauseAnnulation(reservationCancelDTO.getCauseAnnulation());
        historique.setTauxAnnulation(tauxAnnulation);
        historique.setOrigineAnnulation(reservationCancelDTO.getOrigineAnnulation());

        // On cree le coupon si la reservation avait déjà un certain montant paye
        if (reservation.getMontantPaye() > 0) {
            // on cree un soldeIndeminsation si il n'existe pas déjà
            SoldeIndemnisation soldeIndemnisation = soldeIndemnisationRepository
                    .findByIdUserAndIdAgenceVoyage(reservation.getIdUser(), ligneVoyage.getIdAgenceVoyage())
                    .orElse(null);
            if (soldeIndemnisation == null) {
                soldeIndemnisation = new SoldeIndemnisation();
                soldeIndemnisation.setIdSolde(UUID.randomUUID());
                soldeIndemnisation.setIdUser(reservation.getIdUser());
                soldeIndemnisation.setIdAgenceVoyage(ligneVoyage.getIdAgenceVoyage());
                soldeIndemnisation.setSolde(0);
            }

            Coupon coupon = new Coupon();
            coupon.setIdCoupon(UUID.randomUUID());
            coupon.setDateDebut(now);
            Instant debutInstant = now.toInstant();
            Instant finDate = debutInstant.plus(politiqueAnnulation.getDureeCoupon());
            coupon.setDateFin(Date.from(finDate));
            coupon.setValeur(montantSubstitut * (1 - tauxAnnulation)); // tauxAnnulation est le pourcentage que l'usager
            // perd sur son montant
            coupon.setStatusCoupon(StatutCoupon.VALIDE);
            coupon.setIdHistorique(historique.getIdHistorique());
            coupon.setIdSoldeIndemnisation(soldeIndemnisation.getIdSolde());

            soldeIndemnisation.setSolde(soldeIndemnisation.getSolde() + montantSubstitut * (1 - tauxAnnulation));
            couponRepository.save(coupon);
            soldeIndemnisationRepository.save(soldeIndemnisation);
        }

        // on met à jour la reservation
        reservation.setMontantPaye(montantPaye);
        reservation.setNbrPassager(reservation.getNbrPassager() - reservationCancelDTO.getIdPassagers().length);
        reservation.setPrixTotal(
                (reservation.getNbrPassager() - reservationCancelDTO.getIdPassagers().length) * classVoyage.getPrix());
        this.historiqueRepository.save(historique);

        if (reservationCancelDTO.getIdPassagers().length == reservation.getNbrPassager()) {
            reservation.setStatutReservation(StatutReservation.ANNULER);
        }
        this.reservationRepository.save(reservation);
        this.voyageRepository.save(voyage);
        this.reservationRepository.save(reservation);
        return -1.0;
    }

    public double annulerReservationByAgence(ReservationCancelByAgenceDTO reservationCancelDTO) {
        // Récupérer la date et l'heure actuelles
        Date now = new Date();

        // On cherche la reservation
        Reservation reservation = this.reservationRepository.findById(reservationCancelDTO.getIdReservation())
                .orElseThrow(() -> new RuntimeException("La Reservation n'existe pas"));

        if (reservation.getStatutReservation() == StatutReservation.ANNULER) {
            throw new RuntimeException("cette reservation est déjà annulé");
        }

        // On récupère l'historique
        Historique historique = historiqueRepository.findByIdReservation(reservation.getIdReservation()).orElseThrow(
                () -> new RuntimeException("L'Historique associé à la reservation n'existe pas"));

        List<Passager> passagersReservation = passagerRepository.findAllByIdReservation(reservation.getIdReservation());

        Voyage voyage = reservationCancelDTO.getVoyage();
        LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());
        User agenceVoyage = userRepository.findById(ligneVoyage.getIdAgenceVoyage()).orElse(null);
        ClassVoyage classVoyage = classVoyageRepository.findById(ligneVoyage.getIdClassVoyage()).orElse(null);
        PolitiqueAnnulation politiqueAnnulation = politiqueAnnulationRepository
                .findByIdAgenceVoyage(agenceVoyage.getUserId());

        for (Passager passager : passagersReservation) {
            // on detruit l'objet passager dans la BD
            if (reservationCancelDTO.isCanceled()) {
                passagerRepository.deleteById(passager.getIdPassager());
            }
        }

        double tauxCompensation = AnnulationOperator.tauxCompensation(classVoyage.getTauxAnnulation(),
                politiqueAnnulation, voyage.getDateLimiteReservation(), voyage.getDateLimiteConfirmation(), now);
        if (!reservationCancelDTO.isCanceled()) { // si canceled est à false, alors on veut juste evaluer combien on
            // risque perdre et on s'arrete là
            return tauxCompensation * reservation.getMontantPaye();
        }

        // On update l'historique
        historique.setDateAnnulation(now);
        if (reservation.getStatutReservation() == StatutReservation.RESERVER) {
            historique.setStatusHistorique(StatutHistorique.ANNULER_PAR_AGENCE_APRES_RESERVATION);
            voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() - reservation.getNbrPassager());
            voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() + reservation.getNbrPassager());
        } else if (reservation.getStatutReservation() == StatutReservation.CONFIRMER) {
            historique.setStatusHistorique(StatutHistorique.ANNULER_PAR_AGENCE_APRES_CONFIRMATION);
            voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() - reservation.getNbrPassager());
            voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() + reservation.getNbrPassager());
            voyage.setNbrPlaceConfirm(voyage.getNbrPlaceReserve() - reservation.getNbrPassager());
            voyage.setNbrPlaceRestante(voyage.getNbrPlaceReservable() + reservation.getNbrPassager());
        }
        historique.setCauseAnnulation(reservationCancelDTO.getCauseAnnulation());
        historique.setOrigineAnnulation(reservationCancelDTO.getOrigineAnnulation());
        historique.setCompensation(tauxCompensation);

        // On cree le coupon si la reservation avait déjà un certain montant paye
        if (reservation.getMontantPaye() > 0) {
            // on cree un soldeIndeminsation si il n'existe pas déjà
            SoldeIndemnisation soldeIndemnisation = soldeIndemnisationRepository
                    .findByIdUserAndIdAgenceVoyage(reservation.getIdUser(), ligneVoyage.getIdAgenceVoyage())
                    .orElse(null);
            if (soldeIndemnisation == null) {
                soldeIndemnisation = new SoldeIndemnisation();
                soldeIndemnisation.setIdSolde(UUID.randomUUID());
                soldeIndemnisation.setIdUser(reservation.getIdUser());
                soldeIndemnisation.setIdAgenceVoyage(ligneVoyage.getIdAgenceVoyage());
                soldeIndemnisation.setSolde(0);
            }

            Coupon coupon = new Coupon();
            coupon.setIdCoupon(UUID.randomUUID());
            coupon.setDateDebut(now);
            Instant debutInstant = now.toInstant();
            Instant finDate = debutInstant.plus(politiqueAnnulation.getDureeCoupon());
            coupon.setDateFin(Date.from(finDate));
            coupon.setValeur(reservation.getMontantPaye() * (1 + tauxCompensation)); // tauxAnnulation est le
            // pourcentage que l'usager perd
            // sur son montant
            coupon.setStatusCoupon(StatutCoupon.VALIDE);
            coupon.setIdHistorique(historique.getIdHistorique());
            coupon.setIdSoldeIndemnisation(soldeIndemnisation.getIdSolde());

            soldeIndemnisation
                    .setSolde(soldeIndemnisation.getSolde() + reservation.getMontantPaye() * (1 + tauxCompensation));
            couponRepository.save(coupon);
            soldeIndemnisationRepository.save(soldeIndemnisation);
        }

        // on met à jour la reservation
        reservation.setStatutReservation(StatutReservation.ANNULER);
        this.reservationRepository.save(reservation);
        this.historiqueRepository.save(historique);
        this.voyageRepository.save(voyage);
        this.reservationRepository.save(reservation);
        return -1.0;

    }

    @Scheduled(cron = "0 0 * * * *")
    public void checkReservation(){
        // on passe sur toutes les réservations de la BD, on regarde leur statut et ensuite
        List<StatutReservation> statutReservations = new ArrayList<>();
        statutReservations.add(StatutReservation.VALIDER);
        statutReservations.add(StatutReservation.RESERVER);
        List<Reservation> reservations = this.reservationRepository.findAllByStatutReservationIsIn(statutReservations);
        for(Reservation reservation : reservations){
            Voyage voyage = this.voyageRepository.findById(reservation.getIdVoyage()).get();
            Date now = new Date();
            if (now.after(voyage.getDateLimiteConfirmation())){  // on annule ton voyage et on te génère un coupon
                // On récupère l'historique
                Historique historique = historiqueRepository.findByIdReservation(reservation.getIdReservation()).orElseThrow(
                        () -> new RuntimeException("L'Historique associé à la reservation n'existe pas"));

                // on récupère la liste des passagers
                List<Passager> passagersReservation = passagerRepository.findAllByIdReservation(reservation.getIdReservation());
                LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());
                User agenceVoyage = userRepository.findById(ligneVoyage.getIdAgenceVoyage()).orElse(null);
                ClassVoyage classVoyage = classVoyageRepository.findById(ligneVoyage.getIdClassVoyage()).orElse(null);
                PolitiqueAnnulation politiqueAnnulation = politiqueAnnulationRepository
                        .findByIdAgenceVoyage(agenceVoyage.getUserId());
                double montantSubstitut = 0.0; // montant sur lequel va être appliqué le model mathématique pour l'obtention du
                // coupon
                double montantPaye = reservation.getMontantPaye();

                for (int i = 0; i < passagersReservation.size(); i++) {
                    // on detruit l'objet passager dans la BD
                    passagerRepository.deleteById(passagersReservation.get(i).getIdPassager());
                    if (montantPaye >= classVoyage.getPrix()) {
                        montantPaye -= classVoyage.getPrix();
                        montantSubstitut += classVoyage.getPrix();
                    } else if (montantPaye > 0) {
                        montantSubstitut += montantPaye;
                        montantPaye = 0;
                    }
                }
                double tauxAnnulation = AnnulationOperator.tauxannualtion(classVoyage.getTauxAnnulation(), politiqueAnnulation,
                        voyage.getDateLimiteReservation(), voyage.getDateLimiteConfirmation(), now);

                // On update l'historique
                historique.setDateAnnulation(now);
                if (reservation.getStatutReservation() == StatutReservation.RESERVER) {
                    historique.setStatusHistorique(StatutHistorique.ANNULER_PAR_USAGER_APRES_RESERVATION);
                    voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() - passagersReservation.size());
                    voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() + passagersReservation.size());
                } else if (reservation.getStatutReservation() == StatutReservation.CONFIRMER) {
                    historique.setStatusHistorique(StatutHistorique.ANNULER_PAR_USAGER_APRES_CONFIRMATION);
                    voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() - passagersReservation.size());
                    voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() + passagersReservation.size());
                    voyage.setNbrPlaceConfirm(voyage.getNbrPlaceReserve() - passagersReservation.size());
                    voyage.setNbrPlaceRestante(voyage.getNbrPlaceReservable() + passagersReservation.size());
                }
                historique.setCauseAnnulation("Annulation automatique après passage de la date limite de confirmation");
                historique.setTauxAnnulation(tauxAnnulation);
                historique.setOrigineAnnulation("Le client n'a pas confirmé ça réservation à temps");

                // On cree le coupon si la reservation avait déjà un certain montant paye
                if (reservation.getMontantPaye() > 0) {
                    // on cree un soldeIndeminsation si il n'existe pas déjà
                    SoldeIndemnisation soldeIndemnisation = soldeIndemnisationRepository
                            .findByIdUserAndIdAgenceVoyage(reservation.getIdUser(), ligneVoyage.getIdAgenceVoyage())
                            .orElse(null);
                    if (soldeIndemnisation == null) {
                        soldeIndemnisation = new SoldeIndemnisation();
                        soldeIndemnisation.setIdSolde(UUID.randomUUID());
                        soldeIndemnisation.setIdUser(reservation.getIdUser());
                        soldeIndemnisation.setIdAgenceVoyage(ligneVoyage.getIdAgenceVoyage());
                        soldeIndemnisation.setSolde(0);
                    }

                    Coupon coupon = new Coupon();
                    coupon.setIdCoupon(UUID.randomUUID());
                    coupon.setDateDebut(now);
                    Instant debutInstant = now.toInstant();
                    Instant finDate = debutInstant.plus(politiqueAnnulation.getDureeCoupon());
                    coupon.setDateFin(Date.from(finDate));
                    coupon.setValeur(montantSubstitut * (1 - tauxAnnulation)); // tauxAnnulation est le pourcentage que l'usager
                    // perd sur son montant
                    coupon.setStatusCoupon(StatutCoupon.VALIDE);
                    coupon.setIdHistorique(historique.getIdHistorique());
                    coupon.setIdSoldeIndemnisation(soldeIndemnisation.getIdSolde());

                    soldeIndemnisation.setSolde(soldeIndemnisation.getSolde() + montantSubstitut * (1 - tauxAnnulation));
                    couponRepository.save(coupon);
                    soldeIndemnisationRepository.save(soldeIndemnisation);
                }

                // on met à jour la reservation
                reservation.setMontantPaye(montantPaye);
                reservation.setNbrPassager(reservation.getNbrPassager() - passagersReservation.size());
                reservation.setPrixTotal(
                        (reservation.getNbrPassager() - passagersReservation.size()) * classVoyage.getPrix());
                this.reservationRepository.save(reservation);
                this.historiqueRepository.save(historique);

                this.voyageRepository.save(voyage);
                this.reservationRepository.save(reservation);

            }

        }
    }

}
