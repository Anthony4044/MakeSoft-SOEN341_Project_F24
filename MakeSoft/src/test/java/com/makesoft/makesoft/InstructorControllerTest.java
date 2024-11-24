package com.makesoft.makesoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.makesoft.makesoft.classes.Instructor;
import com.makesoft.makesoft.classes.Review;
import com.makesoft.makesoft.classes.Student;
import com.makesoft.makesoft.classes.Team;
import com.makesoft.makesoft.controller.InstructorController;
import com.makesoft.makesoft.service.EmailService;
import com.makesoft.makesoft.service.InstructorService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Unit tests for the InstructorController class.
 */
class InstructorControllerTest {

    @Mock
    private InstructorService instructorService;

    @InjectMocks
    private InstructorController instructorController;

    @Mock
    EmailService emailService;

    /**
     * Initializes mocks for the test class.
     */
    public InstructorControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Tests the signUpInstructor method for a successful signup.
     */
    @Test
    void signUpInstructor_Success() {
        Instructor instructor = new Instructor();
        instructor.setName("John Doe");

        when(instructorService.addInstructor(instructor)).thenReturn(instructor);

        ResponseEntity<?> response = instructorController.signUpInstructor(instructor);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(instructor, response.getBody());
    }

    /**
     * Tests the signUpInstructor method for a conflict scenario.
     */
    @Test
    void signUpInstructor_Conflict() {
        Instructor instructor = new Instructor();
        instructor.setName("Jane Doe");

        when(instructorService.addInstructor(instructor)).thenReturn(null);

        ResponseEntity<?> response = instructorController.signUpInstructor(instructor);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Instructor already exists.", response.getBody());
    }

    /**
     * Tests the signInInstructor method for a successful signin.
     */
    @Test
    void signInInstructor_Success() {
        Instructor instructor = new Instructor();
        instructor.setName("John Doe");
        instructor.setEmail("1");
        instructor.setPassword("1");

        try {
            when(instructorService.findInstructor(instructor.getEmail(), instructor.getPassword())).thenReturn(instructor);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Instructor response = instructorController.signInInstructor(instructor);

        assertEquals(instructor, response);
    }

    /**
     * Tests the signInInstructor method for a conflict scenario.
     */
    @Test
    void signInInstructor_Conflict() {
        Instructor instructor = new Instructor();
        instructor.setName("John Doe");
        instructor.setEmail("1");
        instructor.setPassword("1");

        try {
            when(instructorService.findInstructor(instructor.getEmail(), instructor.getPassword())).thenReturn(null);
        } catch (IOException e) {
            throw new RuntimeException(e);
        }

        Instructor response = instructorController.signInInstructor(instructor);

        assertNull(response);
    }

    /**
     * Tests the getStudents method for a valid section.
     */
    @Test
    void getStudents_ValidSection_ReturnsStudentsList() {
        String section = "A";
        List<Student> students = new ArrayList<>();
        students.add(new Student());

        when(instructorService.findStudentBySection(section)).thenReturn((ArrayList<Student>) students);

        List<Student> result = instructorController.getStudents(section);

        assertNotNull(result);
        assertEquals(1, result.size());
    }

    /**
     * Tests the getStudents method for an empty section.
     */
    @Test
    void getStudents_EmptySection_ReturnsEmptyList() {
        String section = "";
        List<Student> students = new ArrayList<>();

        when(instructorService.findStudentBySection(section)).thenReturn((ArrayList<Student>) students);

        List<Student> result = instructorController.getStudents(section);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the getStudents method for a null section.
     */
    @Test
    void getStudents_NullSection_ReturnsEmptyList() {
        String section = null;
        List<Student> students = new ArrayList<>();

        when(instructorService.findStudentBySection(section)).thenReturn((ArrayList<Student>) students);

        List<Student> result = instructorController.getStudents(section);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the getStudents method for a section with no students.
     */
    @Test
    void getStudents_SectionWithNoStudents_ReturnsEmptyList() {
        String section = "B";
        List<Student> students = new ArrayList<>();

        when(instructorService.findStudentBySection(section)).thenReturn((ArrayList<Student>) students);

        List<Student> result = instructorController.getStudents(section);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the getTeams method for a valid section.
     */
    @Test
    void getTeams_ValidSection_ReturnsTeamsList() {
        String section = "A";
        ArrayList<Team> teams = new ArrayList<>();
        teams.add(new Team());

        when(instructorService.findTeamBySection(section)).thenReturn(teams);

        ArrayList<Team> result = instructorController.getTeams(section);

        assertNotNull(result);
        assertEquals(1, result.size());
    }

    /**
     * Tests the getTeams method for an empty section.
     */
    @Test
    void getTeams_EmptySection_ReturnsEmptyList() {
        String section = "";
        ArrayList<Team> teams = new ArrayList<>();

        when(instructorService.findTeamBySection(section)).thenReturn(teams);

        ArrayList<Team> result = instructorController.getTeams(section);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the getTeams method for a null section.
     */
    @Test
    void getTeams_NullSection_ReturnsEmptyList() {
        String section = null;
        ArrayList<Team> teams = new ArrayList<>();

        when(instructorService.findTeamBySection(section)).thenReturn(teams);

        ArrayList<Team> result = instructorController.getTeams(section);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the getTeams method for a section with no teams.
     */
    @Test
    void getTeams_SectionWithNoTeams_ReturnsEmptyList() {
        String section = "B";
        ArrayList<Team> teams = new ArrayList<>();

        when(instructorService.findTeamBySection(section)).thenReturn(teams);

        ArrayList<Team> result = instructorController.getTeams(section);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the addTeam method for a valid section and team.
     */
    @Test
    void addTeam_ValidSectionAndTeam_ReturnsSuccessMessage() {
        String section = "A";
        Team team = new Team();
        when(instructorService.addTeam(section, team)).thenReturn("Team added successfully.");

        String result = instructorController.addTeam(section, team);

        assertEquals("Team added successfully.", result);
    }

    /**
     * Tests the addStudentToTeam method for a valid section and team name.
     */
    @Test
    void addStudentToTeam_ValidSectionAndTeamName_ReturnsSuccessMessage() {
        String section = "A";
        String teamName = "Team1";
        Map<String, String> payload = Map.of("studentId", "123");
        when(instructorService.addStudentToTeam(section, teamName, "123")).thenReturn(true);

        ResponseEntity<?> response = instructorController.addStudentToTeam(section, teamName, payload);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Student added to team.", response.getBody());
    }

    /**
     * Tests the addStudentToTeam method for an invalid team name.
     */
    @Test
    void addStudentToTeam_InvalidTeamName_ReturnsErrorMessage() {
        String section = "A";
        String teamName = "";
        Map<String, String> payload = Map.of("studentId", "123");
        when(instructorService.addStudentToTeam(section, teamName, "123")).thenReturn(false);

        ResponseEntity<?> response = instructorController.addStudentToTeam(section, teamName, payload);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to add student to team.", response.getBody());
    }

    /**
     * Tests the addStudentToTeam method for an invalid section.
     */
    @Test
    void addStudentToTeam_InvalidSection_ReturnsErrorMessage() {
        String section = "";
        String teamName = "Team1";
        Map<String, String> payload = Map.of("studentId", "123");
        when(instructorService.addStudentToTeam(section, teamName, "123")).thenReturn(false);

        ResponseEntity<?> response = instructorController.addStudentToTeam(section, teamName, payload);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to add student to team.", response.getBody());
    }

    /**
     * Tests the removeStudentFromTeam method for a valid section and team name.
     */
    @Test
    void removeStudentFromTeam_ValidSectionAndTeamName_ReturnsSuccessMessage() {
        String section = "A";
        String teamName = "Team1";
        Map<String, String> payload = Map.of("studentId", "123");
        when(instructorService.removeStudentFromTeam(section, teamName, "123")).thenReturn(true);

        ResponseEntity<?> response = instructorController.removeStudentFromTeam(section, teamName, payload);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals("Student removed from team.", response.getBody());
    }

    /**
     * Tests the removeStudentFromTeam method for an invalid section.
     */
    @Test
    void removeStudentFromTeam_InvalidSection_ReturnsErrorMessage() {
        String section = "";
        String teamName = "Team1";
        Map<String, String> payload = Map.of("studentId", "123");
        when(instructorService.removeStudentFromTeam(section, teamName, "123")).thenReturn(false);

        ResponseEntity<?> response = instructorController.removeStudentFromTeam(section, teamName, payload);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to remove student from team.", response.getBody());
    }

    /**
     * Tests the removeStudentFromTeam method for an invalid team name.
     */
    @Test
    void removeStudentFromTeam_InvalidTeamName_ReturnsErrorMessage() {
        String section = "A";
        String teamName = "";
        Map<String, String> payload = Map.of("studentId", "123");
        when(instructorService.removeStudentFromTeam(section, teamName, "123")).thenReturn(false);

        ResponseEntity<?> response = instructorController.removeStudentFromTeam(section, teamName, payload);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals("Failed to remove student from team.", response.getBody());
    }

    /**
     * Tests the retrieveReviews method for a valid section.
     */
    @Test
    void retrieveReviews_ValidSection_ReturnsFilteredReviews() {
        String section = "A";
        ArrayList<Review> allReviews = new ArrayList<>();
        Review review = new Review();
        Student student = new Student();
        student.setSection("A");
        review.setReviewer(student);
        allReviews.add(review);

        when(instructorService.getReviews()).thenReturn(allReviews);

        List<Review> result = instructorController.retrieveReviews(section);

        assertNotNull(result);
        assertEquals(1, result.size());
    }

    /**
     * Tests the retrieveReviews method for a section with no matching reviews.
     */
    @Test
    void retrieveReviews_SectionWithNoMatchingReviews_ReturnsEmptyList() {
        String section = "B";
        ArrayList<Review> allReviews = new ArrayList<>();
        Review review = new Review();
        Student student = new Student();
        student.setSection("A");
        review.setReviewer(student);
        allReviews.add(review);

        when(instructorService.getReviews()).thenReturn(allReviews);

        List<Review> result = instructorController.retrieveReviews(section);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the getTeam method for a valid student ID.
     */
    @Test
    void getTeam_ValidStudentId_ReturnsTeamWithTeammates() {
        String studentId = "123";
        Student student = new Student();
        Team team = new Team();
        student.setTeam(team);
        ArrayList<Student> teammates = new ArrayList<>();
        Student teammate = new Student();
        teammate.setStudentId("456");
        teammates.add(teammate);

        when(instructorService.getStudentByStudentId(studentId)).thenReturn(student);
        when(instructorService.findTeammates(team)).thenReturn(teammates);

        Team result = instructorController.getTeam(studentId);

        assertNotNull(result);
        assertEquals(1, result.getStudentIds().size());
        assertEquals("456", result.getStudentIds().get(0));
    }

    /**
     * Tests the getTeam method for a student with a team but no teammates.
     */
    @Test
    void getTeam_StudentWithTeamNoTeammates_ReturnsTeamWithEmptyStudentIds() {
        String studentId = "123";
        Student student = new Student();
        Team team = new Team();
        student.setTeam(team);
        ArrayList<Student> teammates = new ArrayList<>();

        when(instructorService.getStudentByStudentId(studentId)).thenReturn(student);
        when(instructorService.findTeammates(team)).thenReturn(teammates);

        Team result = instructorController.getTeam(studentId);

        assertNotNull(result);
        assertTrue(result.getStudentIds().isEmpty());
    }
}