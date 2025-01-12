package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import java.util.UUID;

import javax.persistence.EntityNotFoundException;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.BilletDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.PassagerDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Passager;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.PassagerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@Controller
@AllArgsConstructor
@RequestMapping("/passager")
public class PassagerController {

  private final PassagerService passagerService;

  @Operation(summary = "Créer un nouveau passager", description = "Permet de créer un passager en enregistrant ses informations dans la base de données. L'ID du passager est généré automatiquement.")
  @ApiResponses(value = {
      @ApiResponse(responseCode = "201", description = "Passager créé avec succès.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Passager.class))),
      @ApiResponse(responseCode = "400", description = "Erreur, données invalides dans la requête.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
      @ApiResponse(responseCode = "500", description = "Erreur interne du serveur.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
  })
  @PostMapping()
  public Passager ajouterPassager(@RequestBody PassagerDTO passagerDTO) {
    return this.passagerService.create(passagerDTO);
  }

  /**
   * Récupère les informations complètes d'un billet en fonction de l'ID du
   * passager.
   *
   * @param idPassager L'ID du passager pour lequel récupérer les informations du
   *                   billet.
   * @return BilletDTO représentant les informations du billet.
   */
  @Operation(summary = "Obtenir les informations d'un billet", description = "Cette méthode permet de récupérer toutes les informations liées à un billet, y compris les informations sur le passager et le voyage.", tags = {
      "Billet" })
  @ApiResponses(value = {
      @ApiResponse(responseCode = "200", description = "Billet trouvé et retourné avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = BilletDTO.class))),
      @ApiResponse(responseCode = "404", description = "Le passager ou les informations associées n'ont pas été trouvés", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
      @ApiResponse(responseCode = "500", description = "Erreur interne du serveur", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
  })
  @GetMapping("/billet/{idPassager}")
  public ResponseEntity<BilletDTO> getBilletInformation(@PathVariable UUID idPassager) {
    try {
      // Appel du service pour récupérer les informations du billet
      BilletDTO billetDTO = passagerService.informationPourBillet(idPassager);
      return ResponseEntity.ok(billetDTO); // Retourne un billet avec un statut HTTP 200 OK
    } catch (EntityNotFoundException ex) {
      // Si l'entité n'est pas trouvée, retourner une erreur 404
      return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
    } catch (RuntimeException ex) {
      // En cas d'erreur interne, retourner une erreur 500
      return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
          .body(null);
    }
  }
}
