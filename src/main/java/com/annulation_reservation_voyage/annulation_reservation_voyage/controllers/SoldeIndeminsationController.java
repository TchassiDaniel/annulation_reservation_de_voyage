package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyagePreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.SoldeIndemnisation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.SoldeIndemnisationService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/solde-indemnisation")
public class SoldeIndeminsationController {

    private SoldeIndemnisationService soldeIndemnisationService;

    public SoldeIndeminsationController(SoldeIndemnisationService soldeIndemnisationService) {
        this.soldeIndemnisationService = soldeIndemnisationService;
    }

    @Operation(summary = "Obtenir tous les sodes d'indemnisation",
            description = "Récupère la liste de tous les sodes d'indemnisation enregistrés.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200",
                    description = "Liste récupérée avec succès",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = VoyagePreviewDTO.class))))
    })
    @GetMapping
    public ResponseEntity<List<SoldeIndemnisation>> getAllVoyages() {
        List<SoldeIndemnisation> soldes = soldeIndemnisationService.findAll();
        return new ResponseEntity<>(soldes, HttpStatus.OK);
    }

    @Operation(summary = "Obtenir un solde indemnisation par son ID", description = "Récupère un solde indemnisation en fonction de son identifiant.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "solde indemnisation trouvé",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SoldeIndemnisation.class))),
            @ApiResponse(responseCode = "404", description = "solde indemnisation non trouvé")
    })
    @GetMapping("/{id}")
    public ResponseEntity<SoldeIndemnisation> getVoyageById(@PathVariable UUID id) {
        SoldeIndemnisation solde = soldeIndemnisationService.findById(id);
        if (solde == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(solde, HttpStatus.OK);
    }

    @Operation(summary = "Créer un solde indemnisation", description = "Ajoute un nouveau solde indemnisation à la base de données.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "solde indemnisation créé avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SoldeIndemnisation.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PostMapping
    public ResponseEntity<SoldeIndemnisation> createVoyage(@RequestBody SoldeIndemnisation solde) {
        SoldeIndemnisation createdSolde = soldeIndemnisationService.create(solde);
        //return ResponseEntity.status(HttpStatus.CREATED).body(createdVoyage);
        return new ResponseEntity<>(createdSolde, HttpStatus.CREATED);
    }

    @Operation(summary = "Mettre à jour un solde indemnisation", description = "Modifie un solde indemnisation existant.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "solde indemnisation mis à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = SoldeIndemnisation.class))),
            @ApiResponse(responseCode = "404", description = "solde indemnisation non trouvé"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PutMapping("/{id}")
    public ResponseEntity<SoldeIndemnisation> updateVoyage(@PathVariable UUID id, @RequestBody SoldeIndemnisation solde) {
        if (soldeIndemnisationService.findById(id) == null) {
            //return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        solde.setIdSolde(id); // Assurez-vous que l'ID est correctement défini
        SoldeIndemnisation updatedSolde = soldeIndemnisationService.update(solde);
        return new ResponseEntity<>(updatedSolde, HttpStatus.OK);
    }

    @Operation(summary = "Supprimer un solde indemnisation", description = "Supprime un solde indemnisation en fonction de son identifiant.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "solde indemnisation supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "solde indemnisation non trouvé")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoyage(@PathVariable UUID id) {
        if (soldeIndemnisationService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        soldeIndemnisationService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
