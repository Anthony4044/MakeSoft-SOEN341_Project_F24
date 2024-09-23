package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {

    @Autowired
    private InstructorService instructorService;

    // Instructor signup endpoint
    @PostMapping("/signup")
    public String signUpInstructor(@RequestBody Instructor instructor) {
        String response = instructorService.addInstructor(instructor);
        System.out.println(response);

        return response;
    }


}
