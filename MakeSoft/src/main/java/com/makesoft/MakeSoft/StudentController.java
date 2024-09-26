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
                if(studentExists.equalsIgnoreCase("validStudent")){
                    //return "Student already exists!";

                    FileWriter fw = new FileWriter(studentInstructor.getCSVName(),true);
                    BufferedWriter bw = new BufferedWriter(fw);

                    if (new File(studentInstructor.getCSVName()).length() != 0) {
                        bw.newLine();
                    }

                    bw.write(student.getStudentId() + "," + student.getName() + "," + student.getEmail() + "," + student.getPassword() + "," + student.getSection());



                    bw.flush();
                    bw.close();

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
}

