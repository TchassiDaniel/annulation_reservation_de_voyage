package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.PolitiqueAnnulation;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.PolitiqueAnnulationService;
import org.springframework.stereotype.Controller;
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
@RequestMapping("/politique-annulation")
public class PolitiqueAnnulationController {

    private final PolitiqueAnnulationService politiqueAnnulationService;

    public PolitiqueAnnulationController(PolitiqueAnnulationService politiqueAnnulationService) {
        this.politiqueAnnulationService = politiqueAnnulationService;
    }

    @Operation(summary = "Obtenir toutes les politiques d'annulation",
            description = "Récupère la liste de toutes les politiques d'annulation.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = PolitiqueAnnulation.class))))
    })
    @GetMapping
    public ResponseEntity<List<PolitiqueAnnulation>> getAllPolicies() {
        List<PolitiqueAnnulation> policies = politiqueAnnulationService.findAll();
        return new ResponseEntity<>(policies, HttpStatus.OK);
    }

    @Operation(summary = "Obtenir une politique d'annulation par ID",
            description = "Récupère une politique d'annulation spécifique par ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Politique trouvée",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = PolitiqueAnnulation.class))),
            @ApiResponse(responseCode = "404", description = "Politique non trouvée")
    })
    @GetMapping("/{id}")
    public ResponseEntity<PolitiqueAnnulation> getPolicyById(@PathVariable UUID id) {
        PolitiqueAnnulation policy = politiqueAnnulationService.findById(id);
        if (policy == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(policy, HttpStatus.OK);
    }

    @Operation(summary = "Créer une politique d'annulation",
            description = "Ajoute une nouvelle politique d'annulation.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Politique créée avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = PolitiqueAnnulation.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PostMapping
    public ResponseEntity<PolitiqueAnnulation> createPolicy(@RequestBody PolitiqueAnnulation policy) {
        PolitiqueAnnulation createdPolicy = politiqueAnnulationService.create(policy);
        return new ResponseEntity<>(createdPolicy, HttpStatus.CREATED);
    }

    @Operation(summary = "Mettre à jour une politique d'annulation",
            description = "Modifie une politique d'annulation existante.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Politique mise à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = PolitiqueAnnulation.class))),
            @ApiResponse(responseCode = "404", description = "Politique non trouvée"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PutMapping("/{id}")
    public ResponseEntity<PolitiqueAnnulation> updatePolicy(@PathVariable UUID id, @RequestBody PolitiqueAnnulation policy) {
        if (politiqueAnnulationService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        policy.setIdPolitique(id);
        PolitiqueAnnulation updatedPolicy = politiqueAnnulationService.update(policy);
        return new ResponseEntity<>(updatedPolicy, HttpStatus.OK);
    }

    @Operation(summary = "Supprimer une politique d'annulation",
            description = "Supprime une politique d'annulation par son ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Politique supprimée avec succès"),
            @ApiResponse(responseCode = "404", description = "Politique non trouvée")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletePolicy(@PathVariable UUID id) {
        if (politiqueAnnulationService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        politiqueAnnulationService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
