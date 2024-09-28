package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private InstructorService instructorService;

    String allStudentsFile = "CSV-files/allStudents.csv"; // The file to store all students
    String teamName;

    // Student signup endpoint
    @PostMapping("/signup")
    public String signUpStudent(@RequestBody Student student) {
        Instructor studentInstructor = null;
        try {
            studentInstructor = instructorService.findInstructorBySection(student.getSection());

        } catch (Exception e) {
            System.out.println(e.getMessage());
        }

        System.out.println(student);
        if (studentInstructor != null) {


            try {
                String studentExists = studentAlreadyExists(student, studentInstructor.getCSVName());
                if (studentExists.equalsIgnoreCase("invalidStudent")) {
                    //return "Student already exists!";

                    FileWriter fw = new FileWriter(studentInstructor.getCSVName(), true);
                    BufferedWriter bw = new BufferedWriter(fw);

                    if (new File(studentInstructor.getCSVName()).length() != 0) {
                        bw.newLine();
                    }

                    bw.write(student.getStudentId() + "," + student.getName() + "," + student.getEmail() + "," + student.getPassword() + "," + student.getSection());


                    bw.flush();
                    bw.close();

                    // Call the method to add the student to allStudents.csv
                    addStudentToAllStudents(student);

                    return student.getName() + " signed up and assigned to instructor!";
                } else {
                    return studentExists;
                }
            } catch (IOException e) {
                throw new RuntimeException(e);
            }


        } else {

            return "No instructor found for this section!";
        }
    }

    private String studentAlreadyExists(Student student, String instructorCSV) throws IOException {
        FileReader fr;
        BufferedReader br = null;

        fr = new FileReader(instructorCSV);
        br = new BufferedReader(fr);


        String fileRow = "";
        while ((fileRow = br.readLine()) != null) {

            String studentInfo[] = fileRow.split(",");
            String studentEmail = studentInfo[2];
            String studentId = studentInfo[0];
            boolean sameEmail = student.getEmail().equalsIgnoreCase(studentEmail);
            boolean sameId = student.getStudentId().equalsIgnoreCase(studentId);


            if ((sameId) || (sameEmail)) {

                if (sameId) {
                    fr.close();
                    br.close();
                    return "Student with ID: (" + student.getStudentId() + ") already exists.";
                } else if (sameEmail) {
                    fr.close();
                    br.close();
                    return "Student with email: (" + student.getEmail() + ") already exists.";
                }

                fr.close();
                br.close();
                return "validStudent";
            }

        }
        fr.close();
        br.close();

        return "invalidStudent";
    }

    private void addStudentToAllStudents(Student student) {


        try {
            // Create the file if it does not exist
            File file = new File(allStudentsFile);
            if (!file.exists()) {
                file.createNewFile();
                // Optionally write a header if necessary
                try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, true))) {
                    bw.write("studentId,name,email,password,section");
                    bw.newLine();
                }
            }

            // Append the new student information
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(file, true))) {
                bw.write(student.getStudentId() + "," + student.getName() + "," + student.getEmail() + "," + student.getPassword() + "," + student.getSection());
                bw.newLine(); // New line for the next entry
            }
        } catch (IOException e) {
            System.out.println("Error writing to allStudents.csv: " + e.getMessage());
        }
    }

    @PostMapping("/signin")
    public Student signinStudent(@RequestBody Student student) {
        Student foundStudent = null;
        try {
            foundStudent = findStudentId(student.getEmail(), student.getPassword());
            if (foundStudent == null) {
                return null;
            } else {
                return foundStudent;
            }
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        return null;
    }

    @PostMapping("/findTeam")
    private Team findTeamates(@RequestBody Student student) {
        ArrayList<Student> teamates = null;

        try {
            teamates = retrieveTeamates(student);
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }
        for (int i = 0; i < teamates.size(); i++) {
            System.out.println(teamates.get(i).getName());
        }

        return new Team(teamName, student.getSection(), teamates);

    }

    private Student findStudentId(String email, String password) throws IOException {
        FileReader fr;
        BufferedReader br = null;

        fr = new FileReader(allStudentsFile);
        br = new BufferedReader(fr);

        String fileRow = "";
        while ((fileRow = br.readLine()) != null) {

            String studentInfo[] = fileRow.split(",");
            String studentEmail = studentInfo[2];
            String studentPassword = studentInfo[3];

            boolean sameEmail = email.equalsIgnoreCase(studentEmail);
            boolean samePassword = password.equalsIgnoreCase(studentPassword);

            if ((sameEmail) && (samePassword)) {
                Student st = new Student(studentInfo[0], studentInfo[1], studentInfo[2], studentInfo[3], studentInfo[4]);
                return st;
            }
        }
        return null;
    }

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
            String studentInfo[] = fileRow.split(",");
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

            String studentInfo[] = fileRow.split(",");
            String studentId = studentInfo[0];

            for (int i = 0; i < teamatesId.size(); i++) {

                if (teamatesId.get(i).equalsIgnoreCase(studentId)) {


                    teammates.add(new Student(studentInfo[0], studentInfo[1], studentInfo[2], studentInfo[3], studentInfo[4]));
                }

            }

        }
        return teammates;
    }


}