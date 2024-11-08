package com.makesoft.MakeSoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.dao.DataIntegrityViolationException;

class ReviewControllerTest {

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewController reviewController;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateReview() {

        Student reviewer = new Student();
        reviewer.setName("Alice");
        Student reviewee = new Student();
        reviewee.setName("Bob");

        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);

        // Act
        Review result = reviewController.createReview(review);

        // Assert
        assertNull(result, "The createReview method should return null.");
        verify(reviewRepository, times(1)).save(review);
    }

    @Test
    public void testCreateReviewSuccessfullySavesReview() {
        // Arrange
        Student reviewer = new Student();
        reviewer.setName("Alice");
        Student reviewee = new Student();
        reviewee.setName("Bob");

        Review review = new Review();
        review.setReviewer(reviewer);
        review.setReviewee(reviewee);

        // Act
        Review result = reviewController.createReview(review);

        // Assert
        assertNull(result, "The createReview method should return null.");
        verify(reviewRepository, times(1)).save(review);
    }




}