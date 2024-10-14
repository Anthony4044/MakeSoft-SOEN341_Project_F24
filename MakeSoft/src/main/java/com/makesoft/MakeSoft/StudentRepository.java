package com.makesoft.MakeSoft;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface StudentRepository extends JpaRepository<Student, String> {
    ArrayList<Student> findByEmail(String email);
    ArrayList<Student> findByName(String name);
    ArrayList<Student> findByStudentId(String studentId);

}
