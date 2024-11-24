package com.makesoft.makesoft.classes;

import jakarta.persistence.*;

/**
 * Represents an instructor entity.
 */
@Entity
public class Instructor {

    /**
     * The name of the instructor.
     */
    private String name;

    /**
     * The email of the instructor, used as the primary key.
     */
    @Id
    private String email;

    /**
     * The password of the instructor.
     */
    private String password;

    /**
     * The section the instructor is responsible for.
     */
    private String section;

    /**
     * The name of the CSV file associated with the instructor.
     * This field is ignored by the database.
     */
    @Transient
    private String CSVName;

    /**
     * Constructs a new Instructor with the specified details.
     *
     * @param name     the name of the instructor
     * @param email    the email of the instructor
     * @param password the password of the instructor
     * @param section  the section the instructor is responsible for
     */
    public Instructor(String name, String email, String password, String section) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.section = section;
        this.CSVName = "CSV-files/" + section + "-Students.csv";
    }

    /**
     * Default constructor for Instructor.
     */
    public Instructor() {
    }

    /**
     * Gets the name of the instructor.
     *
     * @return the name of the instructor
     */
    public String getName() {
        return name;
    }

    /**
     * Sets the name of the instructor.
     *
     * @param name the name of the instructor
     */
    public void setName(String name) {
        this.name = name;
    }

    /**
     * Gets the email of the instructor.
     *
     * @return the email of the instructor
     */
    public String getEmail() {
        return email;
    }

    /**
     * Sets the email of the instructor.
     *
     * @param email the email of the instructor
     */
    public void setEmail(String email) {
        this.email = email;
    }

    /**
     * Gets the password of the instructor.
     *
     * @return the password of the instructor
     */
    public String getPassword() {
        return password;
    }

    /**
     * Sets the password of the instructor.
     *
     * @param password the password of the instructor
     */
    public void setPassword(String password) {
        this.password = password;
    }

    /**
     * Gets the section the instructor is responsible for.
     *
     * @return the section the instructor is responsible for
     */
    public String getSection() {
        return section;
    }

    /**
     * Sets the section the instructor is responsible for.
     *
     * @param section the section the instructor is responsible for
     */
    public void setSection(String section) {
        this.section = section;
    }

    /**
     * Gets the name of the CSV file associated with the instructor.
     *
     * @return the name of the CSV file
     */
    public String getCSVName() {
        return CSVName;
    }

    /**
     * Sets the name of the CSV file associated with the instructor.
     *
     * @param CSVName the name of the CSV file
     */
    public void setCSVName(String CSVName) {
        this.CSVName = CSVName;
    }

    /**
     * Returns a string representation of the instructor.
     *
     * @return a string representation of the instructor
     */
    @Override
    public String toString() {
        return this.name + this.email + this.password + this.section + this.CSVName;
    }
}