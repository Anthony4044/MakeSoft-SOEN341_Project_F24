package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {
@Autowired
    private InstructorService instructorService;

    // Instructor signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signUpInstructor(@RequestBody Instructor instructor) {
        Instructor savedInstructor = instructorService.addInstructor(instructor);
        if (savedInstructor != null) {
            System.out.println("Instructor signed up: " + savedInstructor);
            return ResponseEntity.ok(savedInstructor);
        } else {
            System.out.println("Instructor already exists.");
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Instructor already exists.");
        }
    }

    //allows to fetch students in thir section
    @GetMapping("/{section}/students")
    public List<Student> getStudents(@PathVariable String section) {
    return instructorService.getStudentsBySection(section);
    }
    
    // Fetch teams for the instructor
    @GetMapping("/{section}/teams")
    public List<Team> getTeams(@PathVariable String section) {
        return instructorService.getTeamsBySection(section);
    }

    // Add a new team
    @PostMapping("/{section}/teams")
    public String addTeam(@PathVariable String section, @RequestBody Team team) {
        return instructorService.addTeam(section, team);
    }

}
