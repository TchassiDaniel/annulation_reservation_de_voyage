package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationConfirmDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.Reservation.ReservationDetailDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Reservation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.ReservationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/reservation")
public class ReservationController {

    private final ReservationService reservationService;

    public ReservationController(ReservationService reservationService) {
        this.reservationService = reservationService;
    }

    @Operation(summary = "Obtenir toutes les réservations", description = "Récupère la liste de toutes les réservations.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Reservation.class))))
    })
    @GetMapping
    public ResponseEntity<Page<Reservation>> getAllReservations(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<Reservation> reservations = reservationService.findAll(page, size);
        return new ResponseEntity<>(reservations, HttpStatus.OK);
    }

    @Operation(summary = "Obtenir toutes les réservations d'un utilisateur", description = "Récupère la liste de toutes les réservations d'un utilisateur.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Reservation.class)))),
            @ApiResponse(responseCode = "400", description = "données invalides.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    })
    @GetMapping("/{idUser}")
    public ResponseEntity<?> getAllReservationsForUser(@PathVariable UUID idUser,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        try {
            Page<Reservation> reservations = reservationService.findAllForUser(idUser, page, size);
            return new ResponseEntity<>(reservations, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }

    }

    @Operation(summary = "Obtenir une réservation et la liste de ses passagers par ID", description = "Récupère une réservation spécifique par ID Ainsi que la liste de tout ses passagers.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Réservation trouvée", content = @Content(mediaType = "application/json", schema = @Schema(implementation = ReservationDetailDTO.class))),
            @ApiResponse(responseCode = "404", description = "Réservation non trouvée")
    })
    @GetMapping("/{id}")
    public ResponseEntity<ReservationDetailDTO> getReservationById(@PathVariable UUID id) {
        ReservationDetailDTO reservation = reservationService.findById(id);
        if (reservation == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(reservation, HttpStatus.OK);
    }

    @Operation(summary = "Créer une réservation", description = "Ajoute une nouvelle réservation.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Réservation créée avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "404", description = "le voyage dont l'id est donnée n'existe pas"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PostMapping("/reserver")
    public ResponseEntity<?> createReservation(@RequestBody ReservationDTO reservationDTO) {
        try {
            Reservation createdReservation = reservationService.create(reservationDTO);
            return new ResponseEntity<>(createdReservation, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("n'existe pas")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Operation(summary = "Mettre à jour une réservation", description = "Modifie une réservation existante.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Réservation mise à jour avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Reservation.class))),
            @ApiResponse(responseCode = "404", description = "Réservation non trouvée"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Reservation> updateReservation(@PathVariable UUID id, @RequestBody Reservation reservation) {
        if (reservationService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        reservation.setIdReservation(id);
        Reservation updatedReservation = reservationService.update(reservation);
        return new ResponseEntity<>(updatedReservation, HttpStatus.OK);
    }

    @Operation(summary = "Supprimer une réservation", description = "Supprime une réservation par son ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Réservation supprimée avec succès"),
            @ApiResponse(responseCode = "404", description = "Réservation non trouvée")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteReservation(@PathVariable UUID id) {
        if (reservationService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        reservationService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "Confirmer une réservation", description = "Confirme une réservation en modifiant son statut à 'CONFIRME' et en enregistrant l'action dans l'historique.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Réservation confirmée avec succès.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "données invalides.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "reservation inexistante.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    })
    @PutMapping("/confirmer")
    public ResponseEntity<?> confirmerReservation(
            @Parameter(description = "Données nécessaires pour confirmer la réservation (ID de la réservation).", required = true) @RequestBody ReservationConfirmDTO reservationConfirmDTO) {

        try {
            Reservation reservation = reservationService.confirmerReservation(reservationConfirmDTO);
            return new ResponseEntity<>(reservation, HttpStatus.OK);
        } catch (RuntimeException e) {
            if (e.getMessage().contains("n'existe pas")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }
    }

    @Operation(summary = "Annuler une réservation", description = "Permet d'annuler une réservation en par un utilisateur. Si l'annulation a lieu après confirmation, un coupon est généré.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Réservation annulée avec succès.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Erreur, réservation non existante ou données invalides.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "reservation inexistante.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    })
    @PutMapping("/annuler")
    public ResponseEntity<?> annulerReservation(
            @Parameter(description = "Données nécessaires pour annuler la réservation (ID de la réservation et informations supplémentaires).", required = true) @RequestBody ReservationCancelDTO reservationCancelDTO) {

        try {
            double risqueAnnulation = reservationService.annulerReservation(reservationCancelDTO);
            if (risqueAnnulation > 0){
                return new ResponseEntity<>(risqueAnnulation, HttpStatus.OK);
            }
            else{
                return ResponseEntity.ok("Réservation annulée avec succès.");
            }
        } catch (RuntimeException e) {
            if (e.getMessage().contains("n'existe pas")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }
    }
}
