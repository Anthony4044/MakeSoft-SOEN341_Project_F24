package com.makesoft.MakeSoft;

import org.springframework.stereotype.Service;


import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class InstructorService {


    private String allInstructors = "CSV-files/instructors.csv";

    // Add a new instructor
    public String addInstructor(Instructor instructor) {
        BufferedReader br = null;
        BufferedWriter bw = null;


        try {
            //makes csv file one does not exist
            FileWriter fw = new FileWriter(allInstructors, true);
            bw = new BufferedWriter(fw);
            bw.flush();
            bw.close();
            ////////////

            FileReader fr = new FileReader(allInstructors);
            br = new BufferedReader(fr);

            String fileRow ="";
            while ((fileRow = br.readLine()) != null) {

                String instructorInfo[] =fileRow.split(",");
                String instructorName = instructorInfo[0];
                String instructorEmail = instructorInfo[1];
                //checking if new instructor already exists

                if(instructorName.equalsIgnoreCase(instructor.getName())){
                    return "username already exists!";
                }
                else if(instructorEmail.equalsIgnoreCase(instructor.getEmail())){

                    return "Email already in use!";
                }
            }
            br.close();

            //this writer writes instructor info in the instructors csv class
            FileWriter fw2 = new FileWriter(allInstructors, true);
            BufferedWriter bw2 = new BufferedWriter(fw2);

            if (new File(allInstructors).length() != 0) {
                bw2.newLine();
            }
            bw2.write(instructor.getName() + "," + instructor.getEmail() + "," + instructor.getPassword() + "," + instructor.getSection() + "," + instructor.getCSVName());

            //creates a csv file for the instructor's students
            FileWriter fw3 = new FileWriter(instructor.getCSVName(), true);
            BufferedWriter bw3 = new BufferedWriter(fw3);

            bw2.flush();
            bw2.close();


            bw3.flush();
            bw3.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }


            return instructor.getName() + " has signed up successfully!";

    }

    public Instructor findInstructorBySection(String section) throws IOException {
        FileReader fw;
        BufferedReader br;
        try {
             fw = new FileReader(allInstructors);
             br = new BufferedReader(fw);
        } catch (FileNotFoundException e) {
            throw new RuntimeException(e);
        }

        String fileRow ="";
        while ((fileRow = br.readLine()) != null) {

            String instructorInfo[] =fileRow.split(",");
            String instructorSection = instructorInfo[3];


            if(instructorSection.equalsIgnoreCase(section)){
                String name = instructorInfo[0];
                String email = instructorInfo[1];
                String password = instructorInfo[2];

                Instructor instructor = new Instructor(name, email, password,instructorSection);



                return instructor;
            }

        }


        return null;
    }


}

