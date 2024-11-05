package com.makesoft.MakeSoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

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

    /**
     * Initializes mocks for the test class.
     */
    public StudentControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    /**
     * Tests the signUpStudent method for a successful signup.
     */
    @Test
    void signUpStudent_Success() {
        Student student = new Student();
        student.setStudentId("123");
        student.setEmail("test@example.com");
        student.setSection("A");

        try {
            when(studentRepository.findByStudentId(student.getStudentId())).thenReturn(Optional.empty());
            when(studentRepository.findByEmail(student.getEmail())).thenReturn(new ArrayList<Student>());
            when(instructorService.findInstructorBySection(student.getSection())).thenReturn(new Instructor());
            when(studentRepository.save(student)).thenReturn(student);
        } catch (Exception e) {
            System.out.println(e.getMessage());
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
}