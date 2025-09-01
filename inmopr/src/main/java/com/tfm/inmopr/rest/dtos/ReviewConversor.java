/*
 * Copyright (c) 2025 inmopr
 * Licensed under the MIT License. See LICENSE file in the project root for full license information.
 */
package com.tfm.inmopr.rest.dtos;


import com.tfm.inmopr.model.entities.Review;
import com.tfm.inmopr.model.entities.User;

import java.time.LocalDateTime;


public class ReviewConversor {

    private ReviewConversor() {}

    // Entity -> DTO
    public static ReviewDto toReviewDto(Review review) {
        ReviewDto dto = new ReviewDto(); // usamos constructor vacío + setters
        dto.setId(review.getId());
        dto.setRating(review.getRating());
        dto.setComment(review.getComment());
        dto.setCreatedAt(review.getCreatedAt());
        dto.setVerified(review.isVerified());
        dto.setAuthorId(review.getAuthor().getId());

        String authorName =
                review.getAuthor().getFirstName() != null && !review.getAuthor().getFirstName().isBlank()
                        ? review.getAuthor().getFirstName()
                        : review.getAuthor().getEmail();
        dto.setAuthorName(authorName);

        return dto;
    }

    /**
     * DTO -> Entity
     * Nota: Review requiere referencias a User (author y advertiser).
     * Por eso este conversor necesita que se los pases ya cargados.
     * Si esto se llama en un POST /users/{advertiserId}/reviews, el advertiser vendrá de la ruta
     * y el author del token; ambos deberían recuperarse en el servicio antes de invocar este conversor.
     */
    public static Review toReview(ReviewDto reviewDto, User author, User advertiser) {
        Review r = new Review();
        r.setAuthor(author);
        r.setAdvertiser(advertiser);
        r.setRating(reviewDto.getRating());
        r.setComment(reviewDto.getComment());

        LocalDateTime created =
                reviewDto.getCreatedAt() != null ? reviewDto.getCreatedAt() : LocalDateTime.now();
        r.setCreatedAt(created);

        // Normalmente 'verified' y 'createdAt' los fija el servidor; puedes ignorar el valor del DTO si prefieres
        r.setVerified(reviewDto.isVerified());

        return r;
    }
}