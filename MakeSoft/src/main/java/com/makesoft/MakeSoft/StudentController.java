package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.ArrayList;
import java.util.Optional;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private InstructorService instructorService;

    private final StudentRepository studentRepository;

    String teamName;
    @Autowired
    private TeamRepository teamRepository;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Student signup endpoint
    @PostMapping("/signup")
    public Student signUpStudent(@RequestBody Student student) {

        boolean verifiedStudent = studentExists(student);


        if (!verifiedStudent) {
            studentRepository.save(student);
            //System.out.println(student);
            return student;
        } else {

            return null;
        }
    }

    private boolean studentExists(Student student) {
        Optional<Student> students = studentRepository.findByStudentId(student.getStudentId());
        try {
            Instructor instructor = instructorService.findInstructorBySection(student.getSection());
            if (students != null && instructor != null) { //Don't do isPresent()
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return true;
    }


    @PostMapping("/signin")
    public Student signinStudent(@RequestBody Student student) {
        Student foundStudent = null;
        try {
            foundStudent = findStudent(student.getEmail(), student.getPassword());
            return foundStudent;
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    // this is for student page
    @GetMapping("/{id}/addTeam")
    private Team findTeamates(@PathVariable String id) {
        System.out.println("ID: " + id);
        Team team = retrieveTeam(id);
        System.out.println(team.getTeamName());
        //System.out.println(team.getTeamMembers().get(0));
        return team;
    }

    @GetMapping("/{id}/teamMembers")
    private ArrayList<Student> sendTeamMembers(@PathVariable String id) {
        System.out.println("s-id: " + id);
        Optional<Student> optionalStudent = studentRepository.findByStudentId(id);
        Student student = null;
        if(optionalStudent.isPresent()){
            student = optionalStudent.get();
        }
        ArrayList<Student> teamates = studentRepository.findByTeam(student.getTeam());
        for(Student s: teamates){
            System.out.println(s.getName());
        }

        return teamates;
    }


    private Team retrieveTeam(String id) {
        Optional<Student> student1 = studentRepository.findByStudentId(id);
        Optional<Team> optionalTeam = teamRepository.findByTeamId(student1.get().getTeam().getTeamId());
        ArrayList<Student> teamates = studentRepository.findByTeam(student1.get().getTeam());
        Team team = optionalTeam.get();

        //team.setTeamMembers(teamates);
        //System.out.println(team.getTeamMembers());
        ArrayList<String> teamatesIds = new ArrayList<>();
        for (int i = 0; i < teamates.size(); i++) {
            teamatesIds.add(teamates.get(i).getStudentId());
        }
        team.setStudentIds(teamatesIds);
        return team;
    }


    //used for when students sign in
    private Student findStudent(String email, String password) {
        ArrayList<Student> students = studentRepository.findByEmailAndPassword(email, password);
        if (students.isEmpty()) {
            return null;
        } else {
            return students.get(0);
        }
    }
    
}