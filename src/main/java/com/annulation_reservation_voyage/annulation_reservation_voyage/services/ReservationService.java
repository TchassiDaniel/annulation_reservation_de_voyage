package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.PassagerDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements.PayInResult;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements.PayRequestDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements.ResultStatus;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements.StatusResult;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Payements.TransactionStatus;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationConfirmDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDetailDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationPreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageDetailsDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.RoleType;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutHistorique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutPayement;
import com.annulation_reservation_voyage.annulation_reservation_voyage.enums.StatutReservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.*;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.*;
import com.annulation_reservation_voyage.annulation_reservation_voyage.utils.PaginationUtils;

import lombok.AllArgsConstructor;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import java.util.UUID;

@Service
@AllArgsConstructor
public class ReservationService {

    private final ReservationRepository reservationRepository;
    private final HistoriqueRepository historiqueRepository;
    private final VoyageRepository voyageRepository;
    private final LigneVoyageRepository ligneVoyageRepository;
    private final ClassVoyageRepository classVoyageRepository;
    private final PassagerRepository passagerRepository;
    private final UserRepository userRepository;
    private final VoyageService voyageService;
    private final PayementService payementService;
    private final VehiculeRepository vehiculeRepository;

    public Page<Reservation> findAll(int page, int size) {
        // TODO, ajouter un filtre pour ne retourner que les voyages qui ne sont pas
        // déjà passé
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
            User agence = userRepository
                    .findById(this.ligneVoyageRepository.findByIdVoyage(voyage.getIdVoyage())
                            .getIdAgenceVoyage())
                    .orElseThrow(() -> new RuntimeException("Le voyage dont l'id est spécifique n'existe pas."));
            ReservationPreviewDTO reservationPreviewDTO = new ReservationPreviewDTO(reservation, voyage, agence);
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
        // On charge l'agence
        reservationDetailDTO.setAgence(userRepository
                .findById(this.ligneVoyageRepository.findByIdVoyage(reservationDetailDTO.getVoyage().getIdVoyage())
                        .getIdAgenceVoyage())
                .orElseThrow(() -> new RuntimeException("Le voyage dont l'id est spécifique n'existe pas.")));
        // On charge le vehicule
        reservationDetailDTO.setVehicule(vehiculeRepository
                .findById(this.ligneVoyageRepository.findByIdVoyage(reservationDetailDTO.getVoyage().getIdVoyage())
                        .getIdVehicule())
                .orElseThrow(() -> new RuntimeException("Le vehicule dont l'id est spécifique n'existe pas.")));
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
         * 
         * // verifier si l'utilisateur a déjà reserver ce voyage
         * Reservation reservationOpt = reservationRepository
         * .findByIdUserAndIdVoyage(reservationDTO.getIdUser(),
         * reservationDTO.getIdVoyage()).orElse(null);
         * if (reservationOpt != null) {
         * throw new
         * RuntimeException("Cet utilisateur à déjà une réservation pour ce voyage.");
         * }
         */
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
        reservation.setStatutPayement(StatutPayement.NO_PAYMENT);
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

    private Reservation confirmerReservation(ReservationConfirmDTO reservationConfirmDTO) {
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

    public PayInResult payerReservation(PayRequestDTO payRequestDTO) {

        // On se rassure que la reservation existe
        Reservation reservation = this.reservationRepository.findById(payRequestDTO.getReservationId())
                .orElseThrow(() -> new RuntimeException("Reservation non existante"));

        PayInResult payInResult = this.payementService.pay(payRequestDTO.getMobilePhone(),
                payRequestDTO.getMobilePhoneName(), payRequestDTO.getAmount(),
                payRequestDTO.getUserId());

        if (payInResult.getStatus() == ResultStatus.SUCCESS) {
            // On sérialise dans la BD
            reservation.setStatutPayement(StatutPayement.PENDING);
            reservation.setTransactionCode(payInResult.getData().getTransaction_code());
            this.reservationRepository.save(reservation);
        }
        return payInResult;
    }

    @Scheduled(cron = "0 0/5 * * * *")
    public void verifierPayement() {
        List<Reservation> reservations = reservationRepository.findAll();
        // TODO Faire en sorte que la liste retourné soit filtré par le status PENDING
        for (Reservation reservation : reservations) {
            // Si la reservation a un status de PENDING alors on regarde s'il a déjà été
            // payé
            if (reservation.getStatutPayement() == StatutPayement.PENDING) {
                StatusResult statusResult = this.payementService.payStatus(reservation.getTransactionCode());
                if (statusResult.getData().getStatus() == TransactionStatus.COMPLETED) {
                    reservation.setStatutPayement(StatutPayement.PAID);
                    reservation.setMontantPaye(
                            reservation.getMontantPaye() + statusResult.getData().getTransaction_amount());
                    if (reservation.getMontantPaye() >= reservation.getPrixTotal()) {
                        confirmerReservation(new ReservationConfirmDTO(reservation.getIdReservation(),
                                reservation.getMontantPaye()));
                    }
                    System.out.print("Voici le result" + statusResult.toString());
                } else if (statusResult.getStatus() == ResultStatus.FAILED) {
                    reservation.setStatutPayement(StatutPayement.FAILED);

                }
                reservationRepository.save(reservation);

            }
        }
    }
}
