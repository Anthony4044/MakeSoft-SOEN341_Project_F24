package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.*;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private InstructorService instructorService;

    // Student signup endpoint
    @PostMapping("/signup")
    public String signUpStudent(@RequestBody Student student) {
        Instructor studentInstructor = null;
        try{
            studentInstructor = instructorService.findInstructorBySection(student.getSection());

        }catch (Exception e){
            System.out.println(e.getMessage());
        }

        System.out.println(student);
        if (studentInstructor != null) {


            try {
                String studentExists = studentAlreadyExists(student, studentInstructor.getCSVName());
                if(studentExists.equalsIgnoreCase("invalidStudent")){
                    //return "Student already exists!";

                    FileWriter fw = new FileWriter(studentInstructor.getCSVName(),true);
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
                }
                else{
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


        String fileRow ="";
        while ((fileRow = br.readLine()) != null) {

            String studentInfo[] =fileRow.split(",");
            String studentEmail = studentInfo[2];
            String studentId = studentInfo[0];
            boolean sameEmail = student.getEmail().equalsIgnoreCase(studentEmail);
            boolean sameId = student.getStudentId().equalsIgnoreCase(studentId);


            if((sameId) || (sameEmail)){

                if(sameId){
                    fr.close();
                    br.close();
                    return "Student with ID: (" + student.getStudentId() + ") already exists.";
                }else if(sameEmail){
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
        String allStudentsFile = "CSV-files/allStudents.csv"; // The file to store all students

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
    public String signinStudent(@RequestBody Student student){
        return null;
    }


}

