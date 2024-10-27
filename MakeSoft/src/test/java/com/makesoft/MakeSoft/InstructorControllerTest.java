package com.makesoft.MakeSoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.io.IOException;

@SpringBootTest
class InstructorControllerTest {

    @MockBean
    @Mock
    private InstructorService instructorService;

    @InjectMocks
    private InstructorController instructorController;

    public InstructorControllerTest() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void signUpInstructor_Success() {
        Instructor instructor = new Instructor();
        instructor.setName("John Doe");

        when(instructorService.addInstructor(instructor)).thenReturn(instructor);

        ResponseEntity<?> response = instructorController.signUpInstructor(instructor);

        assertEquals(HttpStatus.OK, response.getStatusCode());
        assertEquals(instructor, response.getBody());
    }

    @Test
    void signUpInstructor_Conflict() {
        Instructor instructor = new Instructor();
        instructor.setName("Jane Doe");

        when(instructorService.addInstructor(instructor)).thenReturn(null);

        ResponseEntity<?> response = instructorController.signUpInstructor(instructor);

        assertEquals(HttpStatus.CONFLICT, response.getStatusCode());
        assertEquals("Instructor already exists.", response.getBody());
    }

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
}
