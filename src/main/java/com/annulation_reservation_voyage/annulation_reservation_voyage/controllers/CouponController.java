package com.annulation_reservation_voyage.annulation_reservation_voyage.controllers;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Coupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.services.CouponService;
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
@RequestMapping("/coupons")
public class CouponController {

    private final CouponService couponService;

    public CouponController(CouponService couponService) {
        this.couponService = couponService;
    }

    @Operation(summary = "Obtenir tous les coupons",
            description = "Récupère la liste de tous les coupons.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Liste récupérée avec succès",
                    content = @Content(mediaType = "application/json",
                            array = @ArraySchema(schema = @Schema(implementation = Coupon.class))))
    })
    @GetMapping
    public ResponseEntity<List<Coupon>> getAllCoupons() {
        List<Coupon> coupons = couponService.findAll();
        return new ResponseEntity<>(coupons, HttpStatus.OK);
    }

    @Operation(summary = "Obtenir un coupon par ID",
            description = "Récupère un coupon spécifique par son ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Coupon trouvé",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Coupon.class))),
            @ApiResponse(responseCode = "404", description = "Coupon non trouvé")
    })
    @GetMapping("/{id}")
    public ResponseEntity<Coupon> getCouponById(@PathVariable UUID id) {
        Coupon coupon = couponService.findById(id);
        if (coupon == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(coupon, HttpStatus.OK);
    }

    @Operation(summary = "Créer un coupon",
            description = "Ajoute un nouveau coupon.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "201", description = "Coupon créé avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Coupon.class))),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PostMapping
    public ResponseEntity<Coupon> createCoupon(@RequestBody Coupon coupon) {
        Coupon createdCoupon = couponService.create(coupon);
        return new ResponseEntity<>(createdCoupon, HttpStatus.CREATED);
    }

    @Operation(summary = "Mettre à jour un coupon",
            description = "Modifie un coupon existant.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Coupon mis à jour avec succès",
                    content = @Content(mediaType = "application/json", schema = @Schema(implementation = Coupon.class))),
            @ApiResponse(responseCode = "404", description = "Coupon non trouvé"),
            @ApiResponse(responseCode = "400", description = "Données invalides")
    })
    @PutMapping("/{id}")
    public ResponseEntity<Coupon> updateCoupon(@PathVariable UUID id, @RequestBody Coupon coupon) {
        if (couponService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        coupon.setIdCoupon(id);
        Coupon updatedCoupon = couponService.update(coupon);
        return new ResponseEntity<>(updatedCoupon, HttpStatus.OK);
    }

    @Operation(summary = "Supprimer un coupon",
            description = "Supprime un coupon par son ID.")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "204", description = "Coupon supprimé avec succès"),
            @ApiResponse(responseCode = "404", description = "Coupon non trouvé")
    })
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCoupon(@PathVariable UUID id) {
        if (couponService.findById(id) == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        couponService.delete(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
