package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {


    @Autowired
    private ReviewRepository reviewRepository;

    //injection
    public ReviewController(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @PostMapping
    public Review createReview(@RequestBody Review review) {
        System.out.println(review.getReviewer());
        System.out.println(review.getReviewee());
        reviewRepository.save(review);

        return null;
    }

}