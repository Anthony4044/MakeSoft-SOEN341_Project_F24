package com.makesoft.MakeSoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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


    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);  // Initializes mocks and injects them
        assertNotNull(teamRepository, "teamRepository should be initialized");
    }

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



    ///NEW!!!!!!!!

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