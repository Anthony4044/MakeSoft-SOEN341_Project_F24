package com.makesoft.makesoft.classes;

import jakarta.persistence.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Represents a team entity.
 */
@Entity
public class Team {

    /**
     * The name of the team.
     */
    private String teamName;

    /**
     * The section the team belongs to.
     */
    private String section;

    /**
     * The list of student IDs in the team.
     */
    @ElementCollection
    @Transient
    private List<String> studentIds;

    /**
     * The unique identifier for the team.
     */
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long teamId;

    /**
     * Default constructor for Team.
     */
    public Team() {
    }

    /**
     * Constructs a new Team with the specified name and section.
     *
     * @param teamName the name of the team
     * @param section the section the team belongs to
     */
    public Team(String teamName, String section) {
        this.teamName = teamName;
        this.section = section;
    }

    /**
     * Constructs a new Team with the specified name, section, and student IDs.
     *
     * @param teamName the name of the team
     * @param section the section the team belongs to
     * @param studentIds the list of student IDs in the team
     */
    public Team(String teamName, String section, List<String> studentIds) {
        this.teamName = teamName;
        this.section = section;
        this.studentIds = studentIds;
    }

    /**
     * Constructs a new Team with the specified name, section, and team members.
     *
     * @param teamName the name of the team
     * @param section the section the team belongs to
     * @param teamMembers the list of team members
     */
    public Team(String teamName, String section, ArrayList<Student> teamMembers) {
        this.teamName = teamName;
        this.section = section;
    }

    // Getters and Setters

    /**
     * Gets the name of the team.
     *
     * @return the name of the team
     */
    public String getTeamName() {
        return teamName;
    }

    /**
     * Sets the name of the team.
     *
     * @param teamName the name of the team
     */
    public void setTeamName(String teamName) {
        this.teamName = teamName;
    }

    /**
     * Gets the section the team belongs to.
     *
     * @return the section of the team
     */
    public String getSection() {
        return section;
    }

    /**
     * Sets the section the team belongs to.
     *
     * @param section the section of the team
     */
    public void setSection(String section) {
        this.section = section;
    }

    /**
     * Gets the unique identifier for the team.
     *
     * @return the team ID
     */
    public Long getTeamId() {
        return teamId;
    }

    /**
     * Sets the unique identifier for the team.
     *
     * @param teamId the team ID
     */
    public void setTeamId(Long teamId) {
        this.teamId = teamId;
    }

    /**
     * Gets the list of student IDs in the team.
     *
     * @return the list of student IDs
     */
    public List<String> getStudentIds() {
        return studentIds;
    }

    /**
     * Sets the list of student IDs in the team.
     *
     * @param studentIds the list of student IDs
     */
    public void setStudentIds(List<String> studentIds) {
        this.studentIds = studentIds;
    }
}