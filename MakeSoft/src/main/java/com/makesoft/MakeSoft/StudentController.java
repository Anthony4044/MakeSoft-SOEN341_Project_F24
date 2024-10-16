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

    String allStudentsFile = "CSV-files/allStudents.csv"; // The file to store all students
    String teamName;

    public StudentController(StudentRepository studentRepository) {
        this.studentRepository = studentRepository;
    }

    // Student signup endpoint
    @PostMapping("/signup")
    public Student signUpStudent(@RequestBody Student student) {

        boolean verifiedStudent =  studentExists(student);


        if (!verifiedStudent) {
            studentRepository.save(student);
            System.out.println(student);
            return student;
        } else {

            return null;
        }
    }

    private boolean studentExists(Student student){
        Optional<Student> students = studentRepository.findByStudentId(student.getStudentId());
        try {
            Instructor instructor = instructorService.findInstructorBySection(student.getSection());
            if (students != null && instructor != null) { //Don't do isPresent()
                return false;
            }
        }catch (Exception e){
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
    /** TODO
    // this is for student page
    @PostMapping("/findTeam")
    private Team findTeamates(@RequestBody Student student) {
        ArrayList<Student> teamates = null;

        try {
            teamates = retrieveTeamates(student);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return new Team(teamName, student.getSection(), teamates);

    }
    **/

    private Student findStudent(String email, String password) {
        ArrayList<Student> students = studentRepository.findByEmailAndPassword(email, password);
        if (students.isEmpty()) {
            return null;
        } else {
            return students.get(0);
        }
    }


    /**
    private ArrayList<Student> retrieveTeamates(Student student) throws IOException {
        String Section = student.getSection();
        String studentId = student.getStudentId();
        ArrayList<Student> teamates = new ArrayList<>();
        ArrayList<String> teamatesIds = new ArrayList<>();
        String SectionFile = "CSV-files/" + Section + "-Teams.csv";
        boolean foundTeammates = false;
        FileReader fr;
        BufferedReader br = null;


        fr = new FileReader(SectionFile);
        br = new BufferedReader(fr);


        String fileRow = "";
        while ((fileRow = br.readLine()) != null) {
            String[] studentInfo = fileRow.split(",");
            teamName = studentInfo[0];
            for (int i = 1; i < studentInfo.length; i++) {
                if (studentInfo[i].equalsIgnoreCase(studentId)) {
                    for (int j = 1; j < studentInfo.length; j++) {
                        teamatesIds.add(studentInfo[j]);
                        System.out.println(studentInfo[j]);
                    }
                    foundTeammates = true;
                    break;
                }
            }
            if (foundTeammates) {//stop going through csv if teamates are found
                break;
            }
        }
        teamates = findStudentsById(teamatesIds);
        return teamates;
    }


    private ArrayList<Student> findStudentsById(ArrayList<String> teamatesId) throws IOException {

        ArrayList<Student> teammates = new ArrayList<>();
        FileReader fr;
        BufferedReader br = null;

        fr = new FileReader(allStudentsFile);
        br = new BufferedReader(fr);


        String fileRow = "";
        while ((fileRow = br.readLine()) != null) {

            String[] studentInfo = fileRow.split(",");
            String studentId = studentInfo[0];

            for (int i = 0; i < teamatesId.size(); i++) {

                if (teamatesId.get(i).equalsIgnoreCase(studentId)) {


                    teammates.add(new Student(studentInfo[0], studentInfo[1], studentInfo[2], studentInfo[3], studentInfo[4]));
                }

            }

        }
        return teammates;
    }
     **/


}