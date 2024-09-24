package com.makesoft.MakeSoft;

import java.util.List;

public class Team {
    private String teamName;
    private String section;
    private List<String> studentIds;

    public Team(String teamName, String section, List<String> studentIds) {
        this.teamName = teamName;
        this.section = section;
        this.studentIds = studentIds;
    }

    // Getter and Setter methods
    public String getTeamName() { return teamName; }
    public void setTeamName(String teamName) { this.teamName = teamName; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public List<String> getStudentIds() { return studentIds; }
    public void setStudentIds(List<String> studentIds) { this.studentIds = studentIds; }

    // Convert team data to CSV format
    public String toCSV() {
        StringBuilder sb = new StringBuilder();
        sb.append(teamName);
        for (String id : studentIds) {
            sb.append(",").append(id);
        }
        return sb.toString();
    }
}