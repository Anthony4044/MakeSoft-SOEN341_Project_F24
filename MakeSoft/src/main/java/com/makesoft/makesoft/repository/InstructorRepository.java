package com.makesoft.makesoft.repository;

import com.makesoft.makesoft.classes.Instructor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

/**
 * Repository interface for managing Instructor entities.
 */
public interface InstructorRepository extends JpaRepository<Instructor, Integer> {

    /**
     * Finds instructors by their email.
     *
     * @param email the email of the instructor
     * @return a list of instructors with the specified email
     */
    ArrayList<Instructor> findByEmail(String email);

    /**
     * Finds instructors by their email and name.
     *
     * @param email the email of the instructor
     * @param name the name of the instructor
     * @return a list of instructors with the specified email and name
     */
    ArrayList<Instructor> findByEmailAndName(String email, String name);

    /**
     * Finds instructors by their name.
     *
     * @param name the name of the instructor
     * @return a list of instructors with the specified name
     */
    ArrayList<Instructor> findByName(String name);

    /**
     * Finds instructors by their section.
     *
     * @param section the section of the instructor
     * @return a list of instructors with the specified section
     */
    ArrayList<Instructor> findBySection(String section);

    /**
     * Finds instructors by their email and password.
     *
     * @param email the email of the instructor
     * @param password the password of the instructor
     * @return a list of instructors with the specified email and password
     */
    ArrayList<Instructor> findByEmailAndPassword(String email, String password);
}