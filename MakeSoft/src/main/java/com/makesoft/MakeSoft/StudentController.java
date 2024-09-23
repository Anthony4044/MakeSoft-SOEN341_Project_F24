package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private InstructorService instructorService;

    // Student signup endpoint
    @PostMapping("/signup")
    public boolean signUpStudent(@RequestBody Student student) {

        boolean success = instructorService.addStudentToInstructor(student);
        System.out.println(student);
        if (success) {
            System.out.println("Student signed up and assigned to instructor!");//only used for debugging
            return success;
        } else {
            System.out.println("No instructor found for this section!");//only used for debugging
            return success;
        }
    }
}

