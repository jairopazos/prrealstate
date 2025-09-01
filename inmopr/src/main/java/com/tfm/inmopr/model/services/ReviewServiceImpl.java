package com.tfm.inmopr.model.services;

import com.tfm.inmopr.model.entities.Review;
import com.tfm.inmopr.model.entities.ReviewDao;
import com.tfm.inmopr.model.entities.User;
import com.tfm.inmopr.model.entities.UserDao;
import com.tfm.inmopr.model.exceptions.DuplicateInstanceException;
import com.tfm.inmopr.model.exceptions.InstanceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@Transactional
public class ReviewServiceImpl implements ReviewService {

    @Autowired
    private UserDao userDao;

    @Autowired
    private ReviewDao reviewDao;

    @Override
    @Transactional(readOnly = true)
    public List<Review> findByAdvertiserId(Long advertiserId) throws InstanceNotFoundException {
        return reviewDao.findByAdvertiser_IdOrderByCreatedAtDesc(advertiserId);
    }

    @Override
    public Review createReview(Long advertiserId, Long authorId, int rating, String comment)
            throws InstanceNotFoundException, DuplicateInstanceException {

        User advertiser = userDao.findById(advertiserId)
                .orElseThrow(() -> new InstanceNotFoundException(User.class.getName(), advertiserId));
        User author = userDao.findById(authorId)
                .orElseThrow(() -> new InstanceNotFoundException(User.class.getName(), authorId));

        if (reviewDao.existsByAdvertiser_IdAndAuthor_Id(advertiserId, authorId)) {
            throw new DuplicateInstanceException("project.entities.Review", advertiserId + ":" + authorId);
        }

        Review r = new Review();
        r.setAdvertiser(advertiser);
        r.setAuthor(author);
        r.setRating(Math.max(1, Math.min(5, rating)));
        r.setComment(comment.trim());
        r.setCreatedAt(LocalDateTime.now());

        return reviewDao.save(r);
    }
}