package com.makesoft.makesoft.service;

import com.makesoft.makesoft.classes.Instructor;
import com.makesoft.makesoft.classes.Review;
import com.makesoft.makesoft.classes.Student;
import com.makesoft.makesoft.classes.Team;
import com.makesoft.makesoft.repository.InstructorRepository;
import com.makesoft.makesoft.repository.ReviewRepository;
import com.makesoft.makesoft.repository.StudentRepository;
import com.makesoft.makesoft.repository.TeamRepository;
import jakarta.servlet.MultipartConfigElement;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**
 * Service class for managing instructors, students, teams, and reviews.
 */
@Service
public class InstructorService {

    // Injecting the InstructorRepository using @Autowired
    private final InstructorRepository instructorRepository;
    private final StudentRepository studentRepository;
    private final TeamRepository teamRepository;
    private final ReviewRepository reviewRepository;
    private final MultipartConfigElement multipartConfigElement;


    @Autowired
    private EmailService emailService;

    /**
     * Constructor for InstructorService.
     *
     * @param instructorRepository the repository for instructors
     * @param studentRepository the repository for students
     * @param teamRepository the repository for teams
     * @param reviewRepository the repository for reviews
     * @param multipartConfigElement the multipart config element
     */
    @Autowired
    public InstructorService(InstructorRepository instructorRepository, StudentRepository studentRepository, TeamRepository teamRepository, ReviewRepository reviewRepository, MultipartConfigElement multipartConfigElement) {
        this.instructorRepository = instructorRepository;
        this.studentRepository = studentRepository;
        this.teamRepository = teamRepository;
        this.reviewRepository = reviewRepository;
        this.multipartConfigElement = multipartConfigElement;
    }

    private String allInstructors = "CSV-files/instructors.csv";

    /**
     * Gets the path to the CSV file containing all instructors.
     *
     * @return the path to the CSV file
     */
    public String getAllInstructors() {
        return allInstructors;
    }

    /**
     * Sets the path to the CSV file containing all instructors.
     *
     * @param allInstructors the path to the CSV file
     */
    public void setAllInstructors(String allInstructors) {
        this.allInstructors = allInstructors;
    }

    /**
     * Checks if an instructor exists in the repository.
     *
     * @param instructor the instructor to check
     * @return true if the instructor exists, false otherwise
     */
    private boolean instructorExists(Instructor instructor) {
        ArrayList<Instructor> instructors = instructorRepository.findByEmail(instructor.getEmail());
        // Checks database for all instructors with the specified email and name
        instructors.addAll(instructorRepository.findByName(instructor.getName()));

        for (Instructor instructor1 : instructors) {
            System.out.println(instructor1);
        }
        return !instructors.isEmpty();
    }

    /**
     * Finds students by their section.
     *
     * @param section the section to search for students
     * @return a list of students in the specified section
     */
    public ArrayList<Student> findStudentBySection(String section) {
        return studentRepository.findBySection(section);
    }

    /**
     * Finds teams by their section.
     *
     * @param section the section to search for teams
     * @return a list of teams in the specified section
     */
    public ArrayList<Team> findTeamBySection(String section) {
        ArrayList<Team> teams = teamRepository.findBySection(section);

        for (int i = 0; i < teams.size(); i++) {
            long teamId = teams.get(i).getTeamId();
            ArrayList<Student> teamMembers = studentRepository.findByTeam(teams.get(i));
            // teams.get(i).setTeamMembers(teamMembers);
            ArrayList<String> studentIds = new ArrayList<>();
            for (int j = 0; j < teamMembers.size(); j++) {
                studentIds.add(teamMembers.get(j).getStudentId());
            }
            teams.get(i).setStudentIds(studentIds);
        }
        return teams;
    }

    /**
     * Adds a new instructor to the repository.
     *
     * @param instructor the instructor to add
     * @return the added instructor, or null if the instructor already exists
     */
    public Instructor addInstructor(Instructor instructor) {
        if (!instructorExists(instructor)) {
            // Saves instructor to database
            instructorRepository.save(instructor);
            return instructor;
        }
        return null;
    }

    /**
     * Finds an instructor by their section.
     *
     * @param section the section to search for the instructor
     * @return the found instructor, or null if no instructor is found
     * @throws IOException if an I/O error occurs
     */
    public Instructor findInstructorBySection(String section) throws IOException {
        ArrayList<Instructor> instructors = instructorRepository.findBySection(section);
        return instructors.isEmpty() ? null : instructors.get(0);
    }

    /**
     * Adds a new team to the repository.
     *
     * @param section the section to add the team to
     * @param team the team to add
     * @return a message indicating the result of the operation
     */
    public String addTeam(String section, Team team) {
        if (!teamExist(team)) {
            teamRepository.save(team);
            return "Team added successfully.";
        }
        return "Team already exists.";
    }

    /**
     * Checks if a team exists in the repository.
     *
     * @param team the team to check
     * @return true if the team exists, false otherwise
     */
    public boolean teamExist(Team team) {
        Optional<Team> team2 = teamRepository.findByTeamName(team.getTeamName());
        return team2.isPresent();
    }

    /**
     * Adds a student to a team.
     *
     * @param section the section of the team
     * @param teamName the name of the team
     * @param studentId the ID of the student to add
     * @return true if the student was added successfully, false otherwise
     */
    public boolean addStudentToTeam(String section, String teamName, String studentId) {
        Optional<Team> teamOptional = teamRepository.findByTeamName(teamName);
        if (!teamOptional.isPresent()) {
            return false;
        }
        Team team = teamOptional.get();
        Optional<Student> studentOptional = studentRepository.findByStudentId(studentId);
        if (!studentOptional.isPresent()) {
            return false;
        }
        Student student = studentOptional.get();
        emailService.sendStudentTeaminfo(student.getEmail(), "Added to a new team!", student.getName(), student.getSection(), teamName);

        student.setTeam(team);
        studentRepository.save(student);
        return true;
    }

    /**
     * Finds an instructor by their email and password.
     *
     * @param email the email of the instructor
     * @param password the password of the instructor
     * @return the found instructor, or null if no instructor is found
     * @throws IOException if an I/O error occurs
     */
    public Instructor findInstructor(String email, String password) throws IOException {
        ArrayList<Instructor> instructor = instructorRepository.findByEmailAndPassword(email, password);
        if (instructor.isEmpty()) {
            System.out.println("Instructor not found, does not exist");
            return null;
        }
        return instructor.get(0);
    }

    /**
     * Removes a student from a team.
     *
     * @param section the section of the team
     * @param teamName the name of the team
     * @param studentId the ID of the student to remove
     * @return true if the student was removed successfully, false otherwise
     */
    @Transactional
    public boolean removeStudentFromTeam(String section, String teamName, String studentId) {
        Optional<Team> teamOptional = teamRepository.findByTeamName(teamName);
        if (!teamOptional.isPresent()) {
            return false;
        }
        Team team = teamOptional.get();
        Optional<Student> studentOptional = studentRepository.findByStudentId(studentId);
        if (!studentOptional.isPresent()) {
            return false;
        }
        Student student = studentOptional.get();
        student.setTeam(null);
        reviewRepository.deleteByReviewer(student);
        studentRepository.save(student);
        return true;
    }

    /**
     * Gets all reviews from the repository.
     *
     * @return a list of all reviews
     */
    public List<Review> getReviews() {
        return reviewRepository.findAll();
    }

    /**
     * Finds a student by their student ID.
     *
     * @param studentId the ID of the student to find
     * @return the found student
     */
    public Student getStudentByStudentId(String studentId) {
        Optional<Student> optionalStudent = studentRepository.findByStudentId(studentId);
        return optionalStudent.orElse(null);
    }

    /**
     * Finds teammates of a given team.
     *
     * @param team the team to find teammates for
     * @return a list of teammates
     */
    public ArrayList<Student> findTeammates(Team team) {
        return studentRepository.findByTeam(team);
    }
}