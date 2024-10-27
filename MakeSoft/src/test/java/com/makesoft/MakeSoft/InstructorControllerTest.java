package com.makesoft.MakeSoft;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

class InstructorControllerTest {

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
}
