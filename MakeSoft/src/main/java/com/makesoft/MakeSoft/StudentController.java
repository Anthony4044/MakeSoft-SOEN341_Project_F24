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
                if(studentAlreadyExists(student, studentInstructor.getCSVName())){
                    return "Student Already Exists";
                }else{
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
            } catch (IOException e) {
                throw new RuntimeException(e);
            }


        } else {

            return "No instructor found for this section!";
        }
    }

    private boolean studentAlreadyExists(Student student, String instructorCSV) throws IOException {
        FileReader fr;
        BufferedReader br = null;

             fr = new FileReader(instructorCSV);
             br = new BufferedReader(fr);


        String fileRow ="";
        while ((fileRow = br.readLine()) != null) {

            String studentInfo[] =fileRow.split(",");
            String studentEmail = studentInfo[2];


            if(student.getEmail().equalsIgnoreCase(studentEmail)){

                System.out.println("student already exists");// for debugging only
                fr.close();
                br.close();

                return true;
            }

        }
        fr.close();
        br.close();

        return false;
    }
}

