package com.tfm.inmopr.model.entities;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ReviewDao extends JpaRepository<Review, Long> {
    List<Review> findByAdvertiser_IdOrderByCreatedAtDesc(Long advertiserId);

    boolean existsByAdvertiser_IdAndAuthor_Id(Long advertiserId, Long authorId);
}
