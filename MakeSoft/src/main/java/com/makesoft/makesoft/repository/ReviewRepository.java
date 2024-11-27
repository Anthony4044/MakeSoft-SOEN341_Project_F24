package com.makesoft.makesoft.repository;

import com.makesoft.makesoft.classes.Review;
import com.makesoft.makesoft.classes.Student;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for managing Review entities.
 * No need to add our own methods here. We can use the methods provided by JpaRepository.
 */
public interface ReviewRepository extends JpaRepository<Review, Long> {
    void deleteByReviewer(Student reviewer);
}