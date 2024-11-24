package com.makesoft.makesoft.controller;

import com.makesoft.makesoft.classes.Review;
import com.makesoft.makesoft.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * REST controller for managing reviews.
 */
@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    /**
     * Repository for managing review entities.
     */
    @Autowired
    private ReviewRepository reviewRepository;

    /**
     * Constructor for ReviewController.
     *
     * @param reviewRepository the repository for reviews
     */
    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }


    /**
     * Endpoint to create a new review.
     *
     * @param review the review to create
     * @return the created review
     */
    @PostMapping
    public Review createReview(@RequestBody Review review) {
        System.out.println(review.getReviewer());
        System.out.println(review.getReviewee());
        reviewRepository.save(review);
        return null;
    }
}