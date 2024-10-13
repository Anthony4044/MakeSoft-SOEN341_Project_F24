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

    // Constructor injection (preferred way of dependency injection)
    @Autowired
    public InstructorService(InstructorRepository instructorRepository) {
        this.instructorRepository = instructorRepository;
    }

    private String allInstructors = "CSV-files/instructors.csv";

    public String getAllInstructors() {
        return allInstructors;
    }

    public void setAllInstructors(String allInstructors) {
        this.allInstructors = allInstructors;
    }

    // Add a new instructor
    public Instructor addInstructor(Instructor instructor) {
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
            // Skip the header, this is needed because the header isn't a team
            br.readLine();

            // Read the CSV file line by line
            while ((line = br.readLine()) != null) {
                
                // Check if the line is empty
                if (line.isEmpty()) {
                    continue; // Skip empty lines
                }

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
    }

    public void ins(Instructor instructor){
        Optional<Instructor> ins = instructorRepository.findByEmailAndId("john@example.com",(long)104);
        if (ins.isPresent()) {
            System.out.println(ins.get().getName() + " found by email");
        } else {
            System.out.println("Instructor not found");
        }
    }
    

}

