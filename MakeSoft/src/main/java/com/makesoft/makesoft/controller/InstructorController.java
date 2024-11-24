package com.makesoft.makesoft.controller;

import com.makesoft.makesoft.classes.Instructor;
import com.makesoft.makesoft.classes.Review;
import com.makesoft.makesoft.service.EmailService;
import com.makesoft.makesoft.service.InstructorService;
import com.makesoft.makesoft.classes.Student;
import com.makesoft.makesoft.classes.Team;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * REST controller for managing instructors.
 */
@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    @Autowired
    private EmailService emailService;

    /**
     * Endpoint for instructor signup.
     *
     * @param instructor the instructor to sign up
     * @return a response entity with the signed-up instructor or a conflict status if the instructor already exists
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signUpInstructor(@RequestBody Instructor instructor) {
        
        Instructor savedInstructor = instructorService.addInstructor(instructor);
        if (savedInstructor != null) {
            emailService.sendMail(savedInstructor.getEmail(), "Confirmation Email", savedInstructor.getName(), savedInstructor.getSection(),false);


        
            return ResponseEntity.ok(savedInstructor);
        } else {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Instructor already exists.");
        }
    }

    /**
     * Endpoint for instructor signin.
     *
     * @param instructor the instructor to sign in
     * @return the signed-in instructor or null if the credentials are incorrect
     */
    @PostMapping("/signin")
    public Instructor signInInstructor(@RequestBody Instructor instructor) {
        Instructor savedInstructor = null;
        try {
            savedInstructor = instructorService.findInstructor(instructor.getEmail(), instructor.getPassword());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return savedInstructor;
    }

    /**
     * Endpoint to fetch students in a specific section.
     *
     * @param section the section to fetch students from
     * @return a list of students in the specified section
     */
    @GetMapping("/{section}/students")
    public List<Student> getStudents(@PathVariable String section) {
        return instructorService.findStudentBySection(section);
    }

    /**
     * Endpoint to fetch teams for a specific section.
     *
     * @param section the section to fetch teams from
     * @return a list of teams in the specified section
     */
    @GetMapping("/{section}/teams")
    public ArrayList<Team> getTeams(@PathVariable String section) {
        return instructorService.findTeamBySection(section);
    }

    /**
     * Endpoint to add a new team.
     *
     * @param section the section to add the team to
     * @param team the team to add
     * @return a string message indicating the result of the operation
     */
    @PostMapping("/{section}/teams")
    public String addTeam(@PathVariable String section, @RequestBody Team team) {
        return instructorService.addTeam(section, team);
    }

    /**
     * Endpoint to add a student to a team.
     *
     * @param section the section of the team
     * @param teamName the name of the team
     * @param payload a map containing the student ID
     * @return a response entity indicating the result of the operation
     */
    @PostMapping("/{section}/teams/{teamName}/addStudent")
    public ResponseEntity<?> addStudentToTeam(
            @PathVariable String section,
            @PathVariable String teamName,
            @RequestBody Map<String, String> payload
    ) {
        String studentId = payload.get("studentId");
        boolean success = instructorService.addStudentToTeam(section, teamName, studentId);
        if (success) {
            return ResponseEntity.ok("Student added to team.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to add student to team.");
        }
    }

    /**
     * Endpoint to remove a student from a team.
     *
     * @param section the section of the team
     * @param teamName the name of the team
     * @param payload a map containing the student ID
     * @return a response entity indicating the result of the operation
     */
    @PostMapping("/{section}/teams/{teamName}/removeStudent")
    public ResponseEntity<?> removeStudentFromTeam(
            @PathVariable String section,
            @PathVariable String teamName,
            @RequestBody Map<String, String> payload
    ) {
        String studentId = payload.get("studentId");
        boolean success = instructorService.removeStudentFromTeam(section, teamName, studentId);
        if (success) {
            return ResponseEntity.ok("Student removed from team.");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to remove student from team.");
        }
    }

    /**
     * Endpoint to retrieve reviews for members in a specific section.
     *
     * @param section the section to retrieve reviews from
     * @return a list of reviews for the specified section
     */
    @GetMapping("/{section}/reviewMembers")
    public List<Review> retrieveReviews(@PathVariable String section) {
        ArrayList<Review> allReviews = (ArrayList<Review>) instructorService.getReviews();
        ArrayList<Review> filteredReviews = new ArrayList<>();
        for (Review review : allReviews) {
            if (review.getReviewer().getSection().equalsIgnoreCase(section)) {
                filteredReviews.add(review);
            }
        }
        return filteredReviews;
    }

    /**
     * Endpoint to get the team of a student.
     *
     * @param studentId the ID of the student
     * @return the team of the student
     */
    @PostMapping("/getTeam")
    public Team getTeam(@RequestBody String studentId) {
        Student student = instructorService.getStudentByStudentId(studentId);
        Team team = student.getTeam();
        ArrayList<Student> teammates = instructorService.findTeammates(team);
        team.setStudentIds(new ArrayList<String>());
        for (Student teammate : teammates) {
            team.getStudentIds().add(teammate.getStudentId());
        }
        return team;
    }
}
