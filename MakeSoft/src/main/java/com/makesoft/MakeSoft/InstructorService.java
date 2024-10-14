package com.makesoft.MakeSoft;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.io.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class InstructorService {

    // Injecting the InstructorRepository using @Autowired
    private final InstructorRepository instructorRepository;
    private final StudentRepository studentRepository;


    // Constructor injection (preferred way of dependency injection)
    @Autowired
    public InstructorService(InstructorRepository instructorRepository, StudentRepository studentRepository) {
        this.instructorRepository = instructorRepository;
        this.studentRepository = studentRepository;
    }

    private String allInstructors = "CSV-files/instructors.csv";

    public String getAllInstructors() {
        return allInstructors;
    }

    public void setAllInstructors(String allInstructors) {
        this.allInstructors = allInstructors;
    }

    private boolean instructorExists(Instructor instructor){

        ArrayList<Instructor> instructors = instructorRepository.findByEmail(instructor.getEmail());
        //checks database for all instructors with the specified email amd name
        instructors.addAll(instructorRepository.findByName(instructor.getName()));
        if (instructors.isEmpty()) {
            return false;
        }
            return true;
    }

    // Add a new instructor
    public Instructor addInstructor(Instructor instructor) {
        if(!instructorExists(instructor)){
            //saves instructor to database
            instructorRepository.save(instructor);
            return instructor;
        }
        return null;
        /*
        BufferedReader br = null;
        BufferedWriter bw = null;


        try {
            //makes csv file one does not exist
            FileWriter fw = new FileWriter(allInstructors, true);
            bw = new BufferedWriter(fw);
            bw.flush();
            bw.close();

            FileReader fr = new FileReader(allInstructors);
            br = new BufferedReader(fr);

            String fileRow ="";
            while ((fileRow = br.readLine()) != null) {

                String instructorInfo[] =fileRow.split(",");
                String instructorName = instructorInfo[0];
                String instructorEmail = instructorInfo[1];
                //checking if new instructor already exists

                if(instructorName.equalsIgnoreCase(instructor.getName())){
                    return null;
                }
                else if(instructorEmail.equalsIgnoreCase(instructor.getEmail())){

                    return null;
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


            return instructor;

         */


    }

    public Instructor findInstructorBySection(String section) throws IOException {

        ArrayList<Instructor> instructors = instructorRepository.findBySection(section);

        if (instructors.isEmpty()) {
            return null;
        }else{
            return instructors.get(0);
        }
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
                bw.newLine(); //this is causing issues with blank teams
                bw.write(team.toCSV());
            }

            return "Team added successfully.";

        } catch (IOException e) { 
            e.printStackTrace();
            return "Failed to add team.";
        }
    }

    //adding student to team
    public boolean addStudentToTeam(String section, String teamName, String studentId) {
        /**
        String csvFileName = "CSV-files/" + section + "-Teams.csv";
        List<Team> teams = getTeamsBySection(section);
        boolean teamFound = false;
    
        for (Team team : teams) {
            if (team.getTeamName().equalsIgnoreCase(teamName)) {
                teamFound = true;
                if (!team.getStudentIds().contains(studentId)) {
                    team.getStudentIds().add(studentId);
                }
                break;
            }
        }
    
        if (!teamFound) {
            // Team not found
            return false;
        }
    
        // Write the updated teams back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(csvFileName))) {
            // Write header
            bw.write("teamName,studentIds...");
            bw.newLine();
            for (Team team : teams) {
                bw.write(team.toCSV());
                bw.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    
        return true;
    }

    //removing student from team 
    public boolean removeStudentFromTeam(String section, String teamName, String studentId) {
        String csvFileName = "CSV-files/" + section + "-Teams.csv";
        List<Team> teams = getTeamsBySection(section);
        boolean teamFound = false;
    
        for (Team team : teams) {
            if (team.getTeamName().equalsIgnoreCase(teamName)) {
                teamFound = true;
                if (team.getStudentIds().contains(studentId)) {
                    team.getStudentIds().remove(studentId);
                }
                break;
            }
        }
    
        if (!teamFound) {
            // Team not found
            return false;
        }
    
        // Write the updated teams back to the CSV file
        try (BufferedWriter bw = new BufferedWriter(new FileWriter(csvFileName))) {
            // Write header
            bw.write("teamName,studentIds...");
            bw.newLine();
            for (Team team : teams) {
                bw.write(team.toCSV());
                bw.newLine();
            }
        } catch (IOException e) {
            e.printStackTrace();
            return false;
        }
    
        return true;
         **/
        return false;
    }

    public void ins(Instructor instructor){
        ArrayList<Instructor> ins = instructorRepository.findByEmailAndName("john@example.com","g");
        if (ins.size()>0) {
            System.out.println(ins.get(0).getName() + " found by email");
        } else {
            System.out.println("Instructor not found");
        }
    }
    

}

