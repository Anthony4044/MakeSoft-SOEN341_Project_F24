package com.makesoft.MakeSoft;

import org.springframework.stereotype.Service;


import java.io.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class InstructorService {

    private List<Instructor> instructors = new ArrayList<>();
    private String allInstructors = "CSV-files/instructors.csv";

    // Add a new instructor
    public String addInstructor(Instructor instructor) {
        BufferedReader br = null;
        BufferedWriter bw = null;

        try {
            FileReader fr = new FileReader(allInstructors);
            br = new BufferedReader(fr);

            String fileRow ="";
            while ((fileRow = br.readLine()) != null) {

                String instructorInfo[] =fileRow.split(",");
                String instructorName = instructorInfo[0];
                //checking if new instructor already exists

                if(instructorName.equalsIgnoreCase(instructor.getName())){

                    return "Instructor name already in use";
                }
            }
            br.close();

            FileWriter fw = new FileWriter(allInstructors, true);
            bw = new BufferedWriter(fw);
            bw.newLine();
            bw.write(instructor.getName() + "," + instructor.getEmail() + "," + instructor.getPassword() + "," + instructor.getSection());
            bw.flush();
            bw.close();
        } catch (Exception e) {
            System.out.println(e.getMessage());
        }


            return "Instructor added";

    }


    // Find instructor by section
    public Instructor findInstructorBySection(String section) {
        for (Instructor instructor : instructors) {
            if (instructor.getSection().equalsIgnoreCase(section)) {
                System.out.println("Instructor found for this section!");
                return instructor;
            }
        }
        System.out.println("No instructor found for this section!");
        return null;
    }


    // Add a student to an instructor's list based on section
    public boolean addStudentToInstructor(Student student) {
        Instructor instructor = findInstructorBySection(student.getSection());
        if (instructor != null) {

            System.out.println("Student signed up and assigned to instructor!");
            return true;
        } else {
            System.out.println("No instructor found for this section!");
            return false; // Section not found
        }
    }

    // Get all instructors
    public List<Instructor> getAllInstructors() {

        return instructors;
    }
}

