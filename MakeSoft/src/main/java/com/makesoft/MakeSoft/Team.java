package com.makesoft.MakeSoft;

import java.util.ArrayList;
import java.util.List;

public class Team {
    private String teamName;
    private String section;
    private List<String> studentIds;
    private ArrayList<Student> teamMembers;

    public Team(){

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

    public List<String> getStudentIds() { return studentIds; }
    public void setStudentIds(List<String> studentIds) { this.studentIds = studentIds; }

    // Convert team to CSV format
    public String toCSV() {
        StringBuilder sb = new StringBuilder();
        sb.append(teamName);
        for (String studentId : studentIds) {
            sb.append(",").append(studentId);
        }
        return sb.toString();
    }
}