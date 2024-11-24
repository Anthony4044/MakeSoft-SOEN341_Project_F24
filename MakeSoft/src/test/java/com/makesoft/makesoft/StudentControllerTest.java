package com.makesoft.makesoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.makesoft.makesoft.classes.Instructor;
import com.makesoft.makesoft.classes.Student;
import com.makesoft.makesoft.classes.Team;
import com.makesoft.makesoft.controller.StudentController;
import com.makesoft.makesoft.repository.StudentRepository;
import com.makesoft.makesoft.repository.TeamRepository;
import com.makesoft.makesoft.service.EmailService;
import com.makesoft.makesoft.service.InstructorService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

/**
 * Unit tests for the StudentController class.
 */
class StudentControllerTest {

    @Mock
    private StudentRepository studentRepository;

    @Mock
    private InstructorService instructorService;

    @InjectMocks
    private StudentController studentController;

    @Mock
    EmailService emailService;

    @Mock
    private TeamRepository teamRepository;

    /**
     * Sets up the test environment before each test.
     * Initializes mocks and injects them into the tested class.
     */
    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Initializes mocks and injects them
        assertNotNull(teamRepository, "teamRepository should be initialized");
    }

    /**
     * Tests the studentExists method when the student does not exist and the instructor exists.
     * Expects the method to return false.
     */
    @Test
    void studentExists_StudentDoesNotExistAndInstructorExists_ReturnsFalse() throws IOException {
        // Arrange
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        Instructor instructor = new Instructor();
        instructor.setName("name");

        when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.empty());
        when(studentRepository.findByEmail(student.getEmail())).thenReturn(new ArrayList<>());
        when(instructorService.findInstructorBySection(student.getSection())).thenReturn(instructor);

        // Act
        boolean result = studentController.studentExists(student);

        // Assert
        assertFalse(result, "Expected studentExists to return false when student does not exist and instructor exists");
    }

    /**
     * Tests the studentExists method when the student exists by ID.
     * Expects the method to return true.
     */
    @Test
    void studentExists_StudentByIdExists_ReturnsTrue() throws IOException {
        // Arrange
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.of(student));
        when(studentRepository.findByEmail(student.getEmail())).thenReturn(new ArrayList<>());
        when(instructorService.findInstructorBySection(student.getSection())).thenReturn(new Instructor());

        // Act
        boolean result = studentController.studentExists(student);

        // Assert
        assertTrue(result, "Expected studentExists to return true when student with the same ID exists");
    }

    /**
     * Tests the studentExists method when the student exists by email.
     * Expects the method to return true.
     */
    @Test
    void studentExists_StudentByEmailExists_ReturnsTrue() throws IOException {
        // Arrange
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        ArrayList<Student> studentsWithEmail = new ArrayList<>();
        studentsWithEmail.add(student);

        when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.empty());
        when(studentRepository.findByEmail(student.getEmail())).thenReturn(studentsWithEmail);
        when(instructorService.findInstructorBySection(student.getSection())).thenReturn(new Instructor());

        // Act
        boolean result = studentController.studentExists(student);

        // Assert
        assertTrue(result, "Expected studentExists to return true when student with the same email exists");
    }

    /**
     * Tests the studentExists method when the instructor does not exist.
     * Expects the method to return true.
     */
    @Test
    void studentExists_InstructorDoesNotExist_ReturnsTrue() throws IOException {
        // Arrange
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.empty());
        when(studentRepository.findByEmail(student.getEmail())).thenReturn(new ArrayList<>());
        when(instructorService.findInstructorBySection(student.getSection())).thenReturn(null);

        // Act
        boolean result = studentController.studentExists(student);

        // Assert
        assertTrue(result, "Expected studentExists to return true when no instructor for the section exists");
    }

    /**
     * Tests the studentExists method when an exception is thrown in the instructor service.
     * Expects the method to return true.
     */
    @Test
    void studentExists_ExceptionThrownInInstructorService_ReturnsTrue() throws IOException {
        // Arrange
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.empty());
        when(studentRepository.findByEmail(student.getEmail())).thenReturn(new ArrayList<>());
        when(instructorService.findInstructorBySection(student.getSection())).thenThrow(new RuntimeException("Service error"));

        // Act
        boolean result = studentController.studentExists(student);

        // Assert
        assertTrue(result, "Expected studentExists to return true when exception is thrown in instructor service");
    }

    /**
     * Tests the signUpStudent method for a successful signup.
     * Expects the student to be saved successfully and a confirmation email to be sent.
     */
    @Test
    void signUpStudent_Success() throws IOException {
        // Arrange
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        // Mock the repository and service methods that studentExists depends on
        when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.empty());
        when(studentRepository.findByEmail(student.getEmail())).thenReturn(new ArrayList<>());
        when(instructorService.findInstructorBySection(student.getSection())).thenReturn(new Instructor());

        // Act
        try {
            // Call signUpStudent directly, which will invoke studentExists with the above mocks
            Student savedStudent = studentController.signUpStudent(student);

            // Assert
            assertNotNull(savedStudent);  // Verify that the student was saved successfully
            assertEquals(student.getStudentId(), savedStudent.getStudentId());  // Confirm specific values
            verify(emailService).sendMail(
                    eq(student.getEmail()),
                    eq("Confirmation Email"),
                    eq(student.getName()),
                    eq(student.getSection()),
                    eq(true)
            );
        } catch (Exception e) {
            System.out.println(e.getMessage());
            fail("Exception thrown during test: " + e.getMessage());  // Fail test if exception occurs
        }
    }

    /**
     * Tests the signUpStudent method for a conflict scenario.
     * Expects the method to return null when a conflict occurs.
     */
    @Test
    void signUpStudent_Conflict() {
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        try {
            when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.of(student));
            when(studentRepository.findByEmail(student.getEmail())).thenReturn(new ArrayList<Student>() {{
                add(student);
            }});
            when(instructorService.findInstructorBySection(student.getSection())).thenReturn(new Instructor());

            Student result = studentController.signUpStudent(student);

            assertNull(result);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    /**
     * Tests the signInStudent method for a successful signin.
     * Expects the method to return the signed-in student.
     */
    @Test
    void signInStudent_Success() {
        Student student = new Student();
        student.setEmail("test@email.com");
        student.setPassword("pass");

        try {
            when(studentRepository.findByEmailAndPassword(student.getEmail(), student.getPassword()))
                    .thenReturn(new ArrayList<Student>() {{
                        add(student);
                    }});

            Student result = studentController.signinStudent(student);

            assertNotNull(result);
            System.out.println(result + "\n " + student);
            assertEquals(student.getEmail(), result.getEmail());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    /**
     * Tests the signInStudent method for a conflict scenario.
     * Expects the method to return null when a conflict occurs.
     */
    @Test
    void signInStudent_Conflict() {
        Student student = new Student();
        student.setEmail("test@email.com");
        student.setPassword("wrong");

        try {
            when(studentRepository.findByEmailAndPassword(student.getEmail(), student.getPassword()))
                    .thenReturn(new ArrayList<Student>());

            Student result = studentController.signinStudent(student);

            assertNull(result);
            System.out.println(result + "\n " + student);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
    }

    /**
     * Tests the sendTeamMembers method when a valid student ID is provided.
     * Expects the method to return the team members.
     */
    @Test
    void sendTeamMembers_ValidStudentId_ReturnsTeamMembers() {
        String studentId = "123";
        Student student = new Student();
        student.setStudentId(studentId);
        Team team = new Team();
        student.setTeam(team);
        ArrayList<Student> teammates = new ArrayList<>();
        teammates.add(student);

        when(studentRepository.findByStudentId(studentId)).thenReturn(Optional.of(student));
        when(studentRepository.findByTeam(team)).thenReturn(teammates);

        ArrayList<Student> result = studentController.sendTeamMembers(studentId);

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(studentId, result.get(0).getStudentId());
    }

    /**
     * Tests the sendTeamMembers method when a student without a team is provided.
     * Expects the method to return an empty list.
     */
    @Test
    void sendTeamMembers_StudentWithoutTeam_ReturnsEmptyList() {
        String studentId = "123";
        Student student = new Student();
        student.setStudentId(studentId);

        when(studentRepository.findByStudentId(studentId)).thenReturn(Optional.of(student));

        ArrayList<Student> result = studentController.sendTeamMembers(studentId);

        assertNotNull(result);
        assertTrue(result.isEmpty());
    }

    /**
     * Tests the retrieveTeam method when a valid student ID is provided.
     * Expects the method to return the team with members.
     */
    @Test
    void retrieveTeam_ValidStudentId_ReturnsTeamWithMembers() {
        String studentId = "123";
        Team team = new Team();
        team.setTeamId(1L);
        team.setTeamName("Team A");
        Student student = new Student();
        student.setStudentId(studentId);
        student.setTeam(team);
        ArrayList<Student> teammates = new ArrayList<>();
        teammates.add(student);

        when(studentRepository.findByStudentId(studentId)).thenReturn(Optional.of(student));
        when(teamRepository.findByTeamId(team.getTeamId())).thenReturn(Optional.of(team));
        when(studentRepository.findByTeam(team)).thenReturn(teammates);

        Team result = studentController.retrieveTeam(studentId);

        assertNotNull(result);
        assertEquals("Team A", result.getTeamName());
        assertEquals(1L, result.getTeamId());
        assertEquals(1, result.getStudentIds().size());
        assertEquals(studentId, result.getStudentIds().get(0));
    }

    /**
     * Tests the findTeamates method when a valid student ID is provided.
     * Expects the method to return the team.
     */
    @Test
    void findTeamates_ValidStudentId_ReturnsTeam() {
        String studentId = "123";
        Team team = new Team();
        team.setTeamId(1L);
        team.setTeamName("Team A");
        Student student = new Student();
        student.setStudentId(studentId);
        student.setTeam(team);

        when(studentRepository.findByStudentId(studentId)).thenReturn(Optional.of(student));
        when(teamRepository.findByTeamId(team.getTeamId())).thenReturn(Optional.of(team));

        Team result = studentController.findTeamates(studentId);

        assertNotNull(result);
        assertEquals("Team A", result.getTeamName());
        assertEquals(1L, result.getTeamId());
    }

    /**
     * Tests the findTeamates method when a student in a team without teammates is provided.
     * Expects the method to return the team.
     */
    @Test
    void findTeamates_StudentInTeamWithoutTeammates_ReturnsTeam() {
        String studentId = "123";
        Team team = new Team();
        team.setTeamId(1L);
        team.setTeamName("Team A");
        Student student = new Student();
        student.setStudentId(studentId);
        student.setTeam(team);

        when(studentRepository.findByStudentId(studentId)).thenReturn(Optional.of(student));
        when(teamRepository.findByTeamId(team.getTeamId())).thenReturn(Optional.of(team));
        when(studentRepository.findByTeam(team)).thenReturn(new ArrayList<>());

        Team result = studentController.findTeamates(studentId);

        assertNotNull(result);
        assertEquals("Team A", result.getTeamName());
        assertEquals(1L, result.getTeamId());
    }
}