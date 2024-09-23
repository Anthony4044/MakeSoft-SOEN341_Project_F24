package com.makesoft.MakeSoft;





public class Student {
    private String studentId;
    private String name;
    private String email;
    private String password;
    private String section;

    // Constructor
    public Student(String studentId, String name, String email, String password, String section) {
        this.studentId = studentId;
        this.name = name;
        this.email = email;
        this.password = password;
        this.section = section;
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

    public String toString() {
        return "Student ID: " + studentId + ", Name: " + name + ", Email: " + email + ", Section: " + section;
    }


}
