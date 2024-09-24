package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
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
    public String signUpInstructor(@RequestBody Instructor instructor) {
        String response = instructorService.addInstructor(instructor);
        System.out.println(response);

        return response;
    }

    //allows to fetch students in thir section~~~~~~~~~~~~
    @GetMapping("/{section}/students")
    public List<Student> getStudents(@PathVariable String section) {
    return instructorService.getStudentsBySection(section);
    }
    
    // Fetch teams for the instructor~~~~~~~~~~~~~~~~~~~
    @GetMapping("/{section}/teams")
    public List<Team> getTeams(@PathVariable String section) {
        return instructorService.getTeamsBySection(section);
    }

    // Add a new team~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    @PostMapping("/{section}/teams")
    public String addTeam(@PathVariable String section, @RequestBody Team team) {
        return instructorService.addTeam(section, team);
    }

}
