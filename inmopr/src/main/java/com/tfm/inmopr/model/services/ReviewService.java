package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.Review;
import com.tfm.inmopr.model.exceptions.DuplicateInstanceException;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;

import java.util.List;

public interface ReviewService {
    List<Review> findByAdvertiserId(Long advertiserId) throws InstanceNotFoundException;

    Review createReview(Long advertiserId, Long authorId, int rating, String comment)
            throws InstanceNotFoundException, DuplicateInstanceException;
}
