package com.makesoft.MakeSoft;

import jakarta.servlet.MultipartConfigElement;
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
    private final TeamRepository teamRepository;
    private final ReviewRepository reviewRepository;
    private final MultipartConfigElement multipartConfigElement;


    // Constructor injection (preferred way of dependency injection)
    @Autowired
    public InstructorService(InstructorRepository instructorRepository, StudentRepository studentRepository, TeamRepository teamRepository, ReviewRepository reviewRepository, MultipartConfigElement multipartConfigElement) {
        this.instructorRepository = instructorRepository;
        this.studentRepository = studentRepository;
        this.teamRepository = teamRepository;
        this.reviewRepository = reviewRepository;
        this.multipartConfigElement = multipartConfigElement;
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

    public ArrayList<Student> findStudentBySection(String section) {
        ArrayList<Student> students = studentRepository.findBySection(section);
        return students;
    }

    public ArrayList<Team> findTeamBySection(String section) {
        ArrayList<Team> teams = teamRepository.findBySection(section);

        for(int i = 0;i<teams.size();i++) {
            long teamId =teams.get(i).getTeamId();
            ArrayList<Student> teamMembers = studentRepository.findByTeam(teams.get(i));
           // teams.get(i).setTeamMembers(teamMembers);
            ArrayList<String> studentIds = new ArrayList<>();
            for (int j = 0;j<teamMembers.size();j++) {

                studentIds.add(teamMembers.get(j).getStudentId());

            }
            teams.get(i).setStudentIds(studentIds);

        }
        return teams;
    }
    // Add a new instructor
    public Instructor addInstructor(Instructor instructor) {
        if(!instructorExists(instructor)){
            //saves instructor to database
            instructorRepository.save(instructor);
            return instructor;
        }
        return null;
    }

    public Instructor findInstructorBySection(String section) throws IOException {

        ArrayList<Instructor> instructors = instructorRepository.findBySection(section);

        if (instructors.isEmpty()) {
            return null;
        }else{
            return instructors.get(0);
        }
    }


    public String addTeam(String section, Team team) {
        if(!teamExist(team))  {
            teamRepository.save(team);
            return "Team added successfully.";
        }

            return "Team already exists.";

    }

    public boolean teamExist(Team team) {
        Optional<Team> team2 = teamRepository.findByTeamName(team.getTeamName());

        return team2.isPresent();
    }

    //adding student to team
    public boolean addStudentToTeam(String section, String teamName, String studentId) {
        //find team using teamName
        //add student to team by giving the student the teamId.

        Optional<Team> teamOptional = teamRepository.findByTeamName(teamName);

        if(!teamOptional.isPresent()) {

            return false;

        }
        Team team = teamOptional.get();
        System.out.println();
        Optional<Student> studentOptional = studentRepository.findByStudentId(studentId);

        if(!studentOptional.isPresent()) {

            return false;
        }else{
            Student student = studentOptional.get();
            student.setTeam(team);
            studentRepository.save(student);


            return true;
        }

    }



    public Instructor findInstructor(String email, String password) throws IOException {

        ArrayList<Instructor> instructor = instructorRepository.findByEmailAndPassword(email, password);
        if(instructor.isEmpty()){
            System.out.println("Instructor not found, does not exist");
            return null;
        }
        else {
            return instructor.get(0);
        }
    }


    public boolean removeStudentFromTeam(String section, String teamName, String studentId) {
        Optional<Team> teamOptional = teamRepository.findByTeamName(teamName);

        if(!teamOptional.isPresent()) {

            return false;

        }
        Team team = teamOptional.get();
        System.out.println();
        Optional<Student> studentOptional = studentRepository.findByStudentId(studentId);

        if(!studentOptional.isPresent()) {

            return false;
        }else {
            Student student = studentOptional.get();
            student.setTeam(null);
            studentRepository.save(student);
        }
        return true;
    }

    public List<Review> getReviews() {

        return reviewRepository.findAll();
    }


    public Student getStudentByStudentId(String studentId) {
        Optional<Student> optionalStudent = studentRepository.findByStudentId(studentId);
        Student actualStudent = optionalStudent.get();
        return actualStudent;

    }
    public ArrayList<Student> findTeammates(Team team) {
        ArrayList<Student> teammates = studentRepository.findByTeam(team);
        return teammates;
    }
}

