package com.makesoft.MakeSoft;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface StudentRepository extends JpaRepository<Student, String> {
    ArrayList<Student> findByEmail(String email);
    ArrayList<Student> findByName(String name);
    Optional<Student> findByStudentId(String studentId);
    ArrayList<Student> findBySection(String studentSection);
    ArrayList<Student> findByEmailAndPassword(String email, String password);
    ArrayList<Student> findByTeam(Team team);

}
