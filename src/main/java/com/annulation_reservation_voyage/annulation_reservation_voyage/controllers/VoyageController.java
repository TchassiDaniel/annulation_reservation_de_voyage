package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageCancelDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyageDetailsDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.DTO.voyage.VoyagePreviewDTO;
import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Voyage;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.AnnulationService;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.VoyageService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.ws.rs.QueryParam;
import java.util.UUID;

@RestController
@RequestMapping("/voyage")
public class VoyageController {

    private final VoyageService voyageService;
    private final AnnulationService annulationService;

    public VoyageController(VoyageService voyageService, AnnulationService annulationService) {
        this.voyageService = voyageService;
        this.annulationService = annulationService;
    }

    @Operation(summary = "Obtenir tous les voyages", description = "Récupère la liste de tous les voyages (champs stricts pour le preview) enregistrés.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = VoyagePreviewDTO.class))))
    })
    @GetMapping
    public ResponseEntity<Page<VoyagePreviewDTO>> getAllVoyages(@RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "12") int size) {
        Page<VoyagePreviewDTO> voyages = voyageService.findAllPreview(page, size);
        return new ResponseEntity<>(voyages, HttpStatus.OK);
    }

    @Operation(summary = "Obtenir un voyage par ID", description = "Récupère un voyage en fonction de son identifiant.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Voyage trouvé", content = @Content(mediaType = "application/json", schema = @Schema(implementation = VoyageDetailsDTO.class))),
            @ApiResponse(responseCode = "404", description = "Voyage non trouvé")
    })
    @GetMapping("/{id}")
    public ResponseEntity<VoyageDetailsDTO> getVoyageById(@PathVariable UUID id) {
        VoyageDetailsDTO voyage = voyageService.findById(id);
        if (voyage == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(voyage, HttpStatus.OK);
    }

    @Operation(summary = "Créer un voyage", description = "Ajoute un nouveau voyage à la base de données.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Voyage créé avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Voyage.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PostMapping
    public ResponseEntity<Voyage> createVoyage(@RequestBody Voyage voyage) {
        Voyage createdVoyage = voyageService.create(voyage);
        // return ResponseEntity.status(HttpStatus.CREATED).body(createdVoyage);
        return new ResponseEntity<>(createdVoyage, HttpStatus.CREATED);
    }

    @Operation(summary = "Annuler un voyage par une agence uniquement", description = "Permet d'annuler un voyage.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Voyage annulé avec succès.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "400", description = "Erreur, Voyage non existant ou données invalides.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class))),
            @ApiResponse(responseCode = "404", description = "Voyage inexistant.", content = @Content(mediaType = "application/json", schema = @Schema(implementation = String.class)))
    })
    @PutMapping("/annuler")
    public ResponseEntity<?> annulerVoyage(VoyageCancelDTO voyageCancelDTO){
        try {
            double risqueAnnulation = annulationService.annulerVoyage(voyageCancelDTO);
            if (risqueAnnulation > 0){
                return new ResponseEntity<>(risqueAnnulation, HttpStatus.OK);
            }
            else{
                return ResponseEntity.ok("Voyage annulée avec succès.");
            }
        } catch (RuntimeException e) {
            if (e.getMessage().contains("n'existe pas")) {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
            } else {
                return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
            }
        }

    }

    @Operation(summary = "Mettre à jour un voyage", description = "Modifie un voyage existant.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Voyage mis à jour avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Voyage.class))),
            @ApiResponse(responseCode = "404", description = "Voyage non trouvé"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Voyage> updateVoyage(@PathVariable UUID id, @RequestBody Voyage voyage) {
        if (voyageService.findById(id) == null) {
            // return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        Voyage updatedVoyage = voyageService.update(voyage);
        return new ResponseEntity<>(updatedVoyage, HttpStatus.OK);
    }

    @Operation(summary = "Supprimer un voyage", description = "Supprime un voyage en fonction de son identifiant.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Voyage supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Voyage non trouvé")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVoyage(@PathVariable UUID id) {
        if (voyageService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        voyageService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
