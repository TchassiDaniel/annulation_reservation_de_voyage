package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.PassagerDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationConfirmDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDetailDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationPreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageDetailsDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.*;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.RoleType;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutCoupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.*;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.*;

import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.AnnulationOperator;
import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.PaginationUtils;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.time.Instant;
import java.util.Date;
import java.util.List;

import java.util.List;
import java.util.UUID;

@Service
@AllArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final HistoriqueRepository historiqueRepository;
    private final CouponRepository couponRepository;
    private final VoyageRepository voyageRepository;
    private final LigneVoyageRepository ligneVoyageRepository;
    private final ClassVoyageRepository classVoyageRepository;
    private final PassagerRepository passagerRepository;
    private final UserRepository userRepository;
    private final VoyageService voyageService;
    private final PolitiqueAnnulationRepository politiqueAnnulationRepository;
    private final SoldeIndemnisationRepository soldeIndemnisationRepository;

    public ReservationService(ReservationRepository reservationRepository, HistoriqueRepository historiqueRepository,
            CouponRepository couponRepository, VoyageRepository voyageRepository,
            LigneVoyageRepository ligneVoyageRepository, ClassVoyageRepository classVoyageRepository,
            UserRepository userRepository, PassagerRepository passagerRepository,
            PolitiqueAnnulationRepository politiqueAnnulationRepository,
            SoldeIndemnisationRepository soldeIndemnisationRepository) {
        this.couponRepository = couponRepository;
        this.reservationRepository = reservationRepository;
        this.historiqueRepository = historiqueRepository;
        this.voyageRepository = voyageRepository;
        this.ligneVoyageRepository = ligneVoyageRepository;
        this.classVoyageRepository = classVoyageRepository;
        this.userRepository = userRepository;
        this.passagerRepository = passagerRepository;
        this.politiqueAnnulationRepository = politiqueAnnulationRepository;
        this.soldeIndemnisationRepository = soldeIndemnisationRepository;
    }

    public Page<Reservation> findAll(int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Slice<Reservation> slice = reservationRepository.findAll(pageable);
        long total = reservationRepository.count();
        return PaginationUtils.SliceToPage(slice, total);
    }

    public Page<ReservationPreviewDTO> findAllForUser(UUID idUser, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);

        User user = userRepository.findById(idUser)
                .orElseThrow(() -> new RuntimeException("L'utilisateur dont l'id est spécifié n'existe pas."));
        if (user.getRole() == RoleType.AGENCE_VOYAGE) {
            throw new RuntimeException(
                    "L'utilisateur dont l'id est spécifié est une agence de voyage et ne peut donc pas réservé");
        }
        List<Reservation> reservations = reservationRepository.findByIdUser(idUser);
        List<ReservationPreviewDTO> reservationPreviewDTOs = new ArrayList<>();
        for (Reservation reservation : reservations) {
            Voyage voyage = voyageRepository.findById(reservation.getIdVoyage()).orElse(null);
            ReservationPreviewDTO reservationPreviewDTO = new ReservationPreviewDTO(reservation, voyage);
            reservationPreviewDTOs.add(reservationPreviewDTO);
        }
        long total = reservationRepository.count();
        return PaginationUtils.ContentToPage(reservationPreviewDTOs, pageable, total);
    }

    public ReservationDetailDTO findById(UUID id) {
        Reservation reservation = reservationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("La reservation dont l'id est spécifique n'existe pas."));
        ReservationDetailDTO reservationDetailDTO = new ReservationDetailDTO(reservation);
        // On charge les passager dans la liste
        reservationDetailDTO.setPassager(passagerRepository.findAllByIdReservation(id));
        // On charge le voyage
        reservationDetailDTO.setVoyage(voyageRepository.findById(reservation.getIdVoyage())
                .orElseThrow(() -> new RuntimeException("Le voyage dont l'id est spécifié n'existe pas.")));
        return reservationDetailDTO;
    }

    public Reservation create(ReservationDTO reservationDTO) {
        // Récupérer la date et l'heure actuelles
        Date now = new Date();

        // Vérifier si le voyage existe
        Voyage voyage = voyageRepository.findById(reservationDTO.getIdVoyage())
                .orElseThrow(() -> new RuntimeException("Le voyage dont l'id est spécifié n'existe pas."));

        // verifier si l'utilisateur à déjà reserver ce voyage
        /*
         * Reservation reservationOpt = reservationRepository
         * .findByIdUserAndIdVoyage(reservationDTO.getIdUser(),
         * reservationDTO.getIdVoyage()).orElse(null);
         * if (reservationOpt != null) {
         * throw new
         * RuntimeException("Cet utilisateur à déjà une réservation pour ce voyage.");
         * }
         */
        // verifier si l'utilisateur a déjà reserver ce voyage
        Reservation reservationOpt = reservationRepository
                .findByIdUserAndIdVoyage(reservationDTO.getIdUser(), reservationDTO.getIdVoyage()).orElse(null);
        if (reservationOpt != null) {
            throw new RuntimeException("Cet utilisateur à déjà une réservation pour ce voyage.");
        }

        // Verifier que la liste des passagers est non vide
        if (reservationDTO.getPassagerDTO().length <= 0) {
            throw new RuntimeException("La liste des passagers est vide.");
        }

        // Verifier que les place choisis sont disponibles et correctes
        VoyageDetailsDTO voyageDetailsDTO = voyageService.findById(reservationDTO.getIdVoyage());
        for (PassagerDTO i : reservationDTO.getPassagerDTO()) {
            if (voyageDetailsDTO.getPlaceReservees().contains(i.getPlaceChoisis())) {
                throw new RuntimeException("Une des places choisis est déjà reservée.");
            }
        }
        // Vérifier que la date actuelle est inférieure à la date limite de reservation
        // du voyage
        if (now.after(voyage.getDateLimiteReservation())) {
            throw new RuntimeException(
                    "La date de réservation doit être antérieure à la date limite de reservation du voyage.");
        }

        // Vérifier qu'il y a suffisamment de places reservable
        if (voyage.getNbrPlaceReservable() < reservationDTO.getNbrPassager()) {
            throw new RuntimeException("Il n'y a pas suffisamment de places disponibles pour ce voyage.");
        }

        // verifier que le nombre de passager donné est égale à la taille de la liste de
        // passager
        if (reservationDTO.getNbrPassager() != reservationDTO.getPassagerDTO().length) {
            throw new RuntimeException("Il doit avoir autant de passager que le nombre de passager specifier");
        }

        LigneVoyage ligneVoyage = ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage());
        ClassVoyage classVoyage = classVoyageRepository.findById(ligneVoyage.getIdClassVoyage()).orElse(null);

        // Créer la réservation
        Reservation reservation = new Reservation();
        reservation.setIdReservation(UUID.randomUUID());
        reservation.setDateReservation(now);
        reservation.setStatutReservation(StatutReservation.RESERVER);
        reservation.setIdUser(reservationDTO.getIdUser());
        reservation.setIdVoyage(reservationDTO.getIdVoyage());
        reservation.setNbrPassager(reservationDTO.getNbrPassager());
        reservation.setMontantPaye(reservationDTO.getMontantPaye());
        reservation.setPrixTotal(reservationDTO.getNbrPassager() * classVoyage.getPrix());

        // On cree les passagers
        for (int i = 0; i < reservationDTO.getPassagerDTO().length; i++) {
            Passager passager = new Passager();
            passager.setIdPassager(UUID.randomUUID());
            passager.setNumeroPieceIdentific(reservationDTO.getPassagerDTO()[i].getNumeroPieceIdentific());
            passager.setNom(reservationDTO.getPassagerDTO()[i].getNom());
            passager.setGenre(reservationDTO.getPassagerDTO()[i].getGenre());
            passager.setAge(reservationDTO.getPassagerDTO()[i].getAge());
            passager.setNbrBaggage(reservationDTO.getPassagerDTO()[i].getNbrBaggage());
            passager.setPlaceChoisis(reservationDTO.getPassagerDTO()[i].getPlaceChoisis());
            passager.setIdReservation(reservation.getIdReservation());
            passagerRepository.save(passager);
        }

        // Mettre à jour le nombre de places réservées et réservables
        voyage.setNbrPlaceReserve(voyage.getNbrPlaceReserve() + reservation.getNbrPassager());
        voyage.setNbrPlaceReservable(voyage.getNbrPlaceReservable() - reservation.getNbrPassager());
        voyageRepository.save(voyage);
        // On crée l'historique
        Historique historique = new Historique();
        historique.setIdHistorique(UUID.randomUUID());
        historique.setDateReservation(now);
        historique.setIdReservation(reservation.getIdReservation());
        historique.setStatusHistorique(StatutHistorique.VALIDER);
        this.historiqueRepository.save(historique);

        // Enregistrer la réservation
        return reservationRepository.save(reservation);
    }

    public Reservation update(Reservation reservation) {
        return reservationRepository.save(reservation);
    }

    public void delete(UUID id) {
        reservationRepository.deleteById(id);
    }

    public Reservation confirmerReservation(ReservationConfirmDTO reservationConfirmDTO) {
        // Récupérer la date et l'heure actuelles
        Date now = new Date();

        // On verifie que la reservation existe la reservation
        Reservation reservation = this.reservationRepository.findById(reservationConfirmDTO.getIdReservation())
                .orElseThrow(() -> new RuntimeException("La Reservation n'existe pas"));

        // On récupère l'historique
        Historique historique = historiqueRepository.findByIdReservation(reservation.getIdReservation()).orElseThrow(
                () -> new RuntimeException("L'Historique associé à la reservation n'existe pas"));

        Voyage voyage = voyageRepository.findById(reservation.getIdVoyage()).orElse(null);

        // Vérifier que la date actuelle est inférieure à la date limite de confirmation
        // du voyage
        if (now.after(voyage.getDateLimiteConfirmation())) {
            throw new RuntimeException(
                    "La date de confirmation doit être antérieure à la date limite de confirmation du voyage.");
        }

        // Vérifier qu'il y a suffisamment de places restante
        if (voyage.getNbrPlaceRestante() < reservation.getNbrPassager()) {
            throw new RuntimeException("Il n'y a pas suffisamment de places libre pour confirmation");
        }

        // verifier que le prix total a été payé
        if (reservation.getMontantPaye() + reservationConfirmDTO.getMontantPaye() < reservation.getPrixTotal()) {
            throw new RuntimeException("Le prix total pour le voyage n'est pas complet");
        }

        reservation.setDateConfirmation(now);
        reservation.setMontantPaye(reservationConfirmDTO.getMontantPaye() + reservation.getMontantPaye());
        reservation.setStatutReservation(StatutReservation.CONFIRMER);
        // gestion des places
        voyage.setNbrPlaceRestante(voyage.getNbrPlaceRestante() - reservation.getNbrPassager());
        voyage.setNbrPlaceConfirm(voyage.getNbrPlaceConfirm() + reservation.getNbrPassager());
        this.voyageRepository.save(voyage);

        historique.setDateConfirmation(now);
        historique.setStatusHistorique(StatutHistorique.VALIDER);
        this.historiqueRepository.save(historique);
        return this.reservationRepository.save(reservation);
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

        this.historiqueRepository.save(historique);
        this.voyageRepository.save(voyage);
        this.reservationRepository.save(reservation);
        return -1.0;

    }
}
