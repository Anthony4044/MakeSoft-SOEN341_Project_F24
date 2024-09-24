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

        br.close();
        return null;
    }

    // Method to get students from the CSV file based on the instructor section
    public List<Student> getStudentsBySection(String section) {
        List<Student> students = new ArrayList<>();
        String csvFileName = "CSV-files/" + section + "-Students.csv";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFileName))) {
            String line;
            // Skip the header
            br.readLine();

            // Read the CSV file line by line
            while ((line = br.readLine()) != null) {
                String[] studentData = line.split(",");
                Student student = new Student(studentData[0], studentData[1], studentData[2], studentData[3], studentData[4]);
                students.add(student);
            }
        } catch (IOException e) {
            //e.printStackTrace();
        }

        return students;
    }
    // Method to get teams from the CSV file based on the instructor's section
    public List<Team> getTeamsBySection(String section) {
        List<Team> teams = new ArrayList<>();
        String csvFileName = "CSV-files/" + section + "-Teams.csv";

        try (BufferedReader br = new BufferedReader(new FileReader(csvFileName))) {
            String line;
            // Skip the header
            br.readLine();

            // Read the CSV file line by line
            while ((line = br.readLine()) != null) {
                String[] teamData = line.split(",");
                String teamName = teamData[0];
                List<String> studentIds = new ArrayList<>();
                for (int i = 1; i < teamData.length; i++) {
                    studentIds.add(teamData[i]);
                }
                Team team = new Team(teamName, section, studentIds);
                teams.add(team);
            }
            br.close();
        } catch (IOException e) {
            // File not found or empty
            // e.printStackTrace();
        }

        return teams;
    }

    // Method to add a team to the CSV file
    public String addTeam(String section, Team team) {
        String csvFileName = "CSV-files/" + section + "-Teams.csv";

        try {
            File teamsFile = new File(csvFileName);
            if (!teamsFile.exists()) {
                teamsFile.createNewFile();
                // Write header to the CSV file
                try (BufferedWriter bw = new BufferedWriter(new FileWriter(teamsFile, true))) {
                    bw.write("teamName,studentIds...");
                }
            }

            // Append the new team to the CSV file
            try (BufferedWriter bw = new BufferedWriter(new FileWriter(teamsFile, true))) {
                bw.newLine();
                bw.write(team.toCSV());
            }

            return "Team added successfully.";

        } catch (IOException e) {
            e.printStackTrace();
            return "Failed to add team.";
        }
    }


}

