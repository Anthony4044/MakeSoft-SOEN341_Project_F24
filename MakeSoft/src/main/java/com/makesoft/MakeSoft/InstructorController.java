package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/instructors")
public class InstructorController {
@Autowired
    private InstructorService instructorService;

    // Instructor signup endpoint
    @PostMapping("/signup")
    public ResponseEntity<?> signUpInstructor(@RequestBody Instructor instructor) {

        Instructor savedInstructor = instructorService.addInstructor(instructor);
        System.out.println(savedInstructor);
        if (savedInstructor != null) {
           System.out.println("Instructor signed up: " + savedInstructor);
           return ResponseEntity.ok(savedInstructor);
       } else {
            System.out.println("Instructor already exists.");
           return ResponseEntity.status(HttpStatus.CONFLICT).body("Instructor already exists.");
        }

    }






    // Instructor signin endpoint
    @PostMapping("/signin")
    public Instructor signInInstructor(@RequestBody Instructor instructor)  {
        Instructor savedInstructor = null;
        System.out.println(instructor.getEmail()+"    "+instructor.getPassword());
        try {
            savedInstructor = instructorService.findInstructor(instructor.getEmail(), instructor.getPassword());
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return savedInstructor;

    }
/**
    //allows to fetch students in their section
    @GetMapping("/{section}/students")
    public List<Student> getStudents(@PathVariable String section) {
    return instructorService.getStudentsBySection(section);
    }
    
    // Fetch teams for the instructor
    @GetMapping(    "/{section}/teams")
    public List<Team> getTeams(@PathVariable String section) {
        return instructorService.getTeamsBySection(section);
    }
**/
    // Add a new team
    @PostMapping("/{section}/teams")
    public String addTeam(@PathVariable String section, @RequestBody Team team) {
        return instructorService.addTeam(section, team);
    }

    //adding students to team
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
    //removing students from team
    /**
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
        **/
    //http://localhost:8080/api/instructors/hello
    @PostMapping("/hello")
    private void addInt(@RequestBody Instructor instructor){

        this.instructorService.addInstructor(instructor);
    }
}