package com.makesoft.MakeSoft;


import jakarta.persistence.*;



@Entity
public class Student {

    @Id
    private String studentId;

    private String name;
    private String email;
    private String password;
    private String section;

    @ManyToOne
    @JoinColumn(name = "teamId")
    private Team team;  // This creates a foreign key to the Team table

    // Constructor
    public Student(String studentId, String name, String email, String password, String section) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.section = section;
    }

    public Student() {

    }

    // Getter and Setter methods
    public String getStudentId() { return studentId; }
    public void setStudentId(String studentId) { this.studentId = studentId; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public Team getTeam() {
        return team;
    }

    public void setTeam(Team team) {
        this.team = team;
    }

    public String toString() {
        return "Student ID: " + studentId + ", Name: " + name + ", Email: " + email + ", Section: " + section;
    }


}
