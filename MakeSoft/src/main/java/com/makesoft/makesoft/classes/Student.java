package com.makesoft.makesoft.classes;

import jakarta.persistence.*;

/**
 * Represents a student entity.
 */
@Entity
public class Student {

    /**
     * The unique identifier for the student.
     */
    @Id
    private String studentId;

    /**
     * The name of the student.
     */
    private String name;

    /**
     * The email of the student.
     */
    private String email;

    /**
     * The password of the student.
     */
    private String password;

    /**
     * The section the student belongs to.
     */
    private String section;

    /**
     * The team the student is part of.
     */
    @ManyToOne
    @JoinColumn(name = "teamId")
    private Team team;  // This creates a foreign key to the Team table

    /**
     * Constructs a new Student with the specified details.
     *
     * @param studentId the unique identifier for the student
     * @param name the name of the student
     * @param email the email of the student
     * @param password the password of the student
     * @param section the section the student belongs to
     */
    public Student(String studentId, String name, String email, String password, String section) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.section = section;
    }

    /**
     * Default constructor for Student.
     */
    public Student() {
    }

    // Getter and Setter methods

    /**
     * Gets the unique identifier for the student.
     *
     * @return the student ID
     */
    public String getStudentId() { return studentId; }

    /**
     * Sets the unique identifier for the student.
     *
     * @param studentId the student ID
     */
    public void setStudentId(String studentId) { this.studentId = studentId; }

    /**
     * Gets the name of the student.
     *
     * @return the name of the student
     */
    public String getName() { return name; }

    /**
     * Sets the name of the student.
     *
     * @param name the name of the student
     */
    public void setName(String name) { this.name = name; }

    /**
     * Gets the email of the student.
     *
     * @return the email of the student
     */
    public String getEmail() { return email; }

    /**
     * Sets the email of the student.
     *
     * @param email the email of the student
     */
    public void setEmail(String email) { this.email = email; }

    /**
     * Gets the password of the student.
     *
     * @return the password of the student
     */
    public String getPassword() { return password; }

    /**
     * Sets the password of the student.
     *
     * @param password the password of the student
     */
    public void setPassword(String password) { this.password = password; }

    /**
     * Gets the section the student belongs to.
     *
     * @return the section of the student
     */
    public String getSection() { return section; }

    /**
     * Sets the section the student belongs to.
     *
     * @param section the section of the student
     */
    public void setSection(String section) { this.section = section; }

    /**
     * Gets the team the student is part of.
     *
     * @return the team of the student
     */
    public Team getTeam() {
        return team;
    }

    /**
     * Sets the team the student is part of.
     *
     * @param team the team of the student
     */
    public void setTeam(Team team) {
        this.team = team;
    }

    /**
     * Returns a string representation of the student.
     *
     * @return a string representation of the student
     */
    public String toString() {
        return "Student ID: " + studentId + ", Name: " + name + ", Email: " + email + ", Section: " + section;
    }
}