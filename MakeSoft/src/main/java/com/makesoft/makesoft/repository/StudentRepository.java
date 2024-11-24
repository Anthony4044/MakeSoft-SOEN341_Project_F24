package com.makesoft.makesoft.repository;

import com.makesoft.makesoft.classes.Student;
import com.makesoft.makesoft.classes.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

/**
 * Repository interface for managing Student entities.
 */
public interface StudentRepository extends JpaRepository<Student, String> {

    /**
     * Finds students by their email.
     *
     * @param email the email of the student
     * @return a list of students with the specified email
     */
    ArrayList<Student> findByEmail(String email);

    /**
     * Finds students by their name.
     *
     * @param name the name of the student
     * @return a list of students with the specified name
     */
    ArrayList<Student> findByName(String name);

    /**
     * Finds a student by their unique student ID.
     *
     * @param studentId the unique student ID
     * @return an Optional containing the student if found, or empty if not found
     */
    Optional<Student> findByStudentId(String studentId);

    /**
     * Finds students by their section.
     *
     * @param studentSection the section of the student
     * @return a list of students in the specified section
     */
    ArrayList<Student> findBySection(String studentSection);

    /**
     * Finds students by their email and password.
     *
     * @param email the email of the student
     * @param password the password of the student
     * @return a list of students with the specified email and password
     */
    ArrayList<Student> findByEmailAndPassword(String email, String password);

    /**
     * Finds students by their team.
     *
     * @param team the team of the student
     * @return a list of students in the specified team
     */
    ArrayList<Student> findByTeam(Team team);
}