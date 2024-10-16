package com.makesoft.MakeSoft;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;


@Entity
public class Team {

    private String teamName;
    private String section;
    @ElementCollection
    @Transient
    private List<String> studentIds;
    @OneToMany
    @Transient
    private ArrayList<Student> teamMembers;

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long teamId;

    public Team(){

    }

    public Team(String teamName, String section) {
        this.teamName = teamName;
        this.section = section;
    }

    public Team(String teamName, String section, List<String> studentIds) {
        this.teamName = teamName;
        this.section = section;
        this.studentIds = studentIds;
    }

    public Team(String teamName, String section, ArrayList<Student> teamMembers) {
        this.teamName = teamName;
        this.section = section;
        this.teamMembers = teamMembers;
    }

     public ArrayList<Student> getTeamMembers() {
        return teamMembers;
    }

    public void setTeamMembers(ArrayList<Student> teamMembers) {
        this.teamMembers = teamMembers;
    }

    // Getters and Setters
    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public Long getTeamId() {
        return teamId;
    }

    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    public List<String> getStudentIds() {
        return studentIds;
    }

    public void setStudentIds(List<String> studentIds) {
        this.studentIds = studentIds;
    }
}