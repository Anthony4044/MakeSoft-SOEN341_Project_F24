package com.makesoft.makesoft.controller;

import com.makesoft.makesoft.classes.Instructor;
import com.makesoft.makesoft.classes.Student;
import com.makesoft.makesoft.classes.Team;
import com.makesoft.makesoft.repository.StudentRepository;
import com.makesoft.makesoft.repository.TeamRepository;
import com.makesoft.makesoft.service.EmailService;
import com.makesoft.makesoft.service.InstructorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Optional;

/**
 * REST controller for managing student-related operations.
 */
@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private InstructorService instructorService;

    private final StudentRepository studentRepository;

    @Autowired
    private EmailService emailService;

    String teamName;
    @Autowired
    private TeamRepository teamRepository;

    /**
     * Constructor for StudentController.
     *
     * @param studentRepository the repository for managing students
     */
    @Autowired
    public StudentController(StudentRepository studentRepository, InstructorService instructorService,
                             EmailService emailService, TeamRepository teamRepository) {
        this.studentRepository = studentRepository;
        this.instructorService = instructorService;
        this.emailService = emailService;
        this.teamRepository = teamRepository;
    }
    /**
     * Endpoint for student signup.
     *
     * @param student the student to sign up
     * @return the signed-up student or null if the student already exists
     */
    @PostMapping("/signup")
    public Student signUpStudent(@RequestBody Student student) {
        boolean verifiedStudent = studentExists(student);
        System.out.println(verifiedStudent);

        if (!verifiedStudent) {
            studentRepository.save(student);
            emailService.sendMail(student.getEmail(), "Confirmation Email",student.getName(),student.getSection(),true );
            return student;
        } else {
            return null;
        }
    }

    /**
     * Checks if a student already exists.
     *
     * @param student the student to check
     * @return true if the student exists, false otherwise
     */
    public boolean studentExists(Student student) {
        Optional<Student> students = studentRepository.findByStudentId(student.getStudentId());
        ArrayList<Student> studentsEmail = studentRepository.findByEmail(student.getEmail());
        try {
            Instructor instructor = instructorService.findInstructorBySection(student.getSection());
            if ((!students.isPresent())&& instructor != null && studentsEmail.isEmpty()) {
                return false;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());

        }
        return true;
    }

    /**
     * Endpoint for student signin.
     *
     * @param student the student to sign in
     * @return the signed-in student or null if the student is not found
     */
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

    /**
     * Endpoint to find the team of a student.
     *
     * @param id the student ID
     * @return the team of the student
     */
    @GetMapping("/{id}/addTeam")
    public Team findTeamates(@PathVariable String id) {
        System.out.println("ID: " + id);
        Team team = retrieveTeam(id);
        System.out.println(team.getTeamName());
        return team;
    }

    /**
     * Endpoint to get the team members of a student.
     *
     * @param id the student ID
     * @return the list of team members
     */
    @GetMapping("/{id}/teamMembers")
    public ArrayList<Student> sendTeamMembers(@PathVariable String id) {
        System.out.println("s-id: " + id);
        Optional<Student> optionalStudent = studentRepository.findByStudentId(id);
        Student student = null;
        if (optionalStudent.isPresent()) {
            student = optionalStudent.get();
        }
        ArrayList<Student> teamates = studentRepository.findByTeam(student.getTeam());
        for (Student s : teamates) {
            System.out.println(s.getName());
        }
        return teamates;
    }

    /**
     * Retrieves the team of a student.
     *
     * @param id the student ID
     * @return the team of the student
     */
    public Team retrieveTeam(String id) {
        Optional<Student> student1 = studentRepository.findByStudentId(id);
        Optional<Team> optionalTeam = teamRepository.findByTeamId(student1.get().getTeam().getTeamId());
        ArrayList<Student> teamates = studentRepository.findByTeam(student1.get().getTeam());
        Team team = optionalTeam.get();

        ArrayList<String> teamatesIds = new ArrayList<>();
        for (int i = 0; i < teamates.size(); i++) {
            teamatesIds.add(teamates.get(i).getStudentId());
        }
        team.setStudentIds(teamatesIds);
        return team;
    }

    /**
     * Finds a student by email and password.
     *
     * @param email the email of the student
     * @param password the password of the student
     * @return the found student or null if not found
     */
    private Student findStudent(String email, String password) {
        ArrayList<Student> students = studentRepository.findByEmailAndPassword(email, password);
        if (students.isEmpty()) {
            return null;
        } else {
            return students.get(0);
        }
    }
}