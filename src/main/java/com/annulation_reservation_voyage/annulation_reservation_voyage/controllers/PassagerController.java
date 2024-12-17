package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.PassagerDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Passager;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.PassagerService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
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

}
