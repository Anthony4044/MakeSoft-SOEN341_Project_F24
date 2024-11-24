package com.makesoft.MakeSoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.makesoft.MakeSoft.Classes.Review;
import com.makesoft.MakeSoft.Classes.Student;
import com.makesoft.MakeSoft.Controller.ReviewController;
import com.makesoft.MakeSoft.Repository.ReviewRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

/**
 * Unit tests for the ReviewController class.
 */
class ReviewControllerTest {

    @Mock
    private ReviewRepository reviewRepository;

    @InjectMocks
    private ReviewController reviewController;

    /**
     * Sets up the test environment before each test.
     * Initialize mocks and injects them into the controller.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Tests the createReview method with valid reviewer and reviewee.
     * Verifies that the method returns null and the review is saved.
     */
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

    /**
     * Tests the createReview method to ensure the review is successfully saved.
     * Verifies that the method returns null and the review is saved.
     */
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