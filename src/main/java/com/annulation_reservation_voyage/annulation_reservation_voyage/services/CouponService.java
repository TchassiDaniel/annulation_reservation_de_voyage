package com.annulation_reservation_voyage.annulation_reservation_voyage.services;

import com.annulation_reservation_voyage.annulation_reservation_voyage.models.Coupon;
import com.annulation_reservation_voyage.annulation_reservation_voyage.repositories.CouponRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
public class CouponService {
    private final CouponRepository couponRepository;

    public CouponService(CouponRepository couponRepository) {
        this.couponRepository = couponRepository;
    }

    public List<Coupon> findAll() {
        return couponRepository.findAll();
    }

    public Coupon findById(UUID id) {
        return couponRepository.findById(id).orElse(null);
    }

    public Coupon create(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public Coupon update(Coupon coupon) {
        return couponRepository.save(coupon);
    }

    public void delete(UUID id) {
        couponRepository.deleteById(id);
    }
}
