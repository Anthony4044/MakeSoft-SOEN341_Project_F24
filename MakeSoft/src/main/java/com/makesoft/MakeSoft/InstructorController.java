package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

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

    //allows to fetch students in their section
    @GetMapping("/{section}/students")
    public List<Student> getStudents(@PathVariable String section) {
    return instructorService.findStudentBySection(section);
    }


    // Fetch teams for the instructor
    @GetMapping("/{section}/teams")
    public ArrayList<Team> getTeams(@PathVariable String section) {
        return instructorService.findTeamBySection(section);
    }



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


    @GetMapping("/{section}/reviewMembers")
    public List<Review> retrieveReviews(@PathVariable String section) {
        ArrayList<Review> allReviews = (ArrayList<Review>) instructorService.getReviews();
        ArrayList<Review> filteredReviews = new ArrayList<>();
        for (Review review : allReviews) {
            if((review.getReviewer().getSection().equalsIgnoreCase(section))){
                filteredReviews.add(review);
            }

        }
        for (Review review : filteredReviews) {

            System.out.println(review.getReviewer().getSection());
        }

        return filteredReviews;
    }

    @PostMapping("/getTeam")
    public Team getTeam(@RequestBody String studentId) {
       Student student = instructorService.getStudentByStudentId(studentId);
        Team team = student.getTeam();
        ArrayList<Student> teamates = instructorService.findTeammates(team);
        team.setStudentIds(new ArrayList<String>());

        for(int i = 0; i<teamates.size(); i++) {

            team.getStudentIds().add(teamates.get(i).getStudentId());

        }
        return team;
    }

}