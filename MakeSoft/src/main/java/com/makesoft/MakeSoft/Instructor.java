package com.makesoft.MakeSoft;

import jakarta.persistence.*;
import org.springframework.boot.autoconfigure.domain.EntityScan;

import java.util.ArrayList;

@Entity
//@Table(name = "instructors") manually sets table name. if not used, takes class name
public class Instructor {

    //@Transient helps database ignore attribute
    private String name;
    private String email;
    private String password;
    private String section;

    @Transient
    private String CSVName;
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    // Constructor
    public Instructor(String name, String email, String password, String section) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.section = section;
        this.CSVName = "CSV-files/"+section + "-Students.csv";

    }

    public Instructor() {

    }

    // Getter and Setter methods
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getSection() { return section; }
    public void setSection(String section) { this.section = section; }

    public String getCSVName() {
        return CSVName;
    }

    public void setCSVName(String CSVName) {
        this.CSVName = CSVName;
    }

    @Override
    public String toString() {
        return    this.name +  this.email + this.password+ this.section + this.CSVName;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }
}

