package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Historique;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.HistoriqueService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.ArraySchema;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
@RequestMapping("/historique")
public class HistoriqueController {

        private final HistoriqueService historiqueService;

        @Operation(summary = "Obtenir tous les historique", description = "Récupère la liste de tous les historiques.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Historique.class))))
        })
        @GetMapping
        public ResponseEntity<List<Historique>> getAllHistoriques() {
                List<Historique> historiques = historiqueService.findAll();
                return new ResponseEntity<>(historiques, HttpStatus.OK);
        }

        @Operation(summary = "Obtenir tous les historique de reservation d'un utilisateur", description = "Récupère la liste de tous les historiques de reservations d'un utilisateur.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès", content = @Content(mediaType = "application/json", array = @ArraySchema(schema = @Schema(implementation = Historique.class))))
        })
        @GetMapping("reservation/{idUtilisateur}")
        public ResponseEntity<List<Historique>> getHistoriqueReservation(@PathVariable UUID idUtilisateur) {
                List<Historique> historiques = historiqueService.historiqueReservationParUtilisateur(idUtilisateur);
                return new ResponseEntity<>(historiques, HttpStatus.OK);
        }

        @Operation(summary = "Obtenir un historique par ID", description = "Récupère un historique spécifique par ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Historique trouvé", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Historique.class))),
                        @ApiResponse(responseCode = "404", description = "Historique non trouvé")
        })
        @GetMapping("/{id}")
        public ResponseEntity<Historique> getHistoriqueById(@PathVariable UUID id) {
                Historique historique = historiqueService.findById(id);
                if (historique == null) {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                return new ResponseEntity<>(historique, HttpStatus.OK);
        }

        @Operation(summary = "Créer un historique", description = "Ajoute un nouvel historique.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "201", description = "Historique créé avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Historique.class))),
                        @ApiResponse(responseCode = "400", description = "Données invalides")
        })
        @PostMapping
        public ResponseEntity<Historique> createHistorique(@RequestBody Historique historique) {
                Historique createdHistorique = historiqueService.create(historique);
                return new ResponseEntity<>(createdHistorique, HttpStatus.CREATED);
        }

        @Operation(summary = "Mettre à jour un historique", description = "Modifie un historique existant.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "200", description = "Historique mis à jour avec succès", content = @Content(mediaType = "application/json", schema = @Schema(implementation = Historique.class))),
                        @ApiResponse(responseCode = "404", description = "Historique non trouvé"),
                        @ApiResponse(responseCode = "400", description = "Données invalides")
        })
        @PutMapping("/{id}")
        public ResponseEntity<Historique> updateHistorique(@PathVariable UUID id, @RequestBody Historique historique) {
                if (historiqueService.findById(id) == null) {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                historique.setIdHistorique(id);
                Historique updatedHistorique = historiqueService.update(historique);
                return new ResponseEntity<>(updatedHistorique, HttpStatus.OK);
        }

        @Operation(summary = "Supprimer un historique", description = "Supprime un historique par son ID.")
        @ApiResponses(value = {
                        @ApiResponse(responseCode = "204", description = "Historique supprimé avec succès"),
                        @ApiResponse(responseCode = "404", description = "Historique non trouvé")
        })
        @DeleteMapping("/{id}")
        public ResponseEntity<Void> deleteHistorique(@PathVariable UUID id) {
                if (historiqueService.findById(id) == null) {
                        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
                }
                historiqueService.delete(id);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
}
