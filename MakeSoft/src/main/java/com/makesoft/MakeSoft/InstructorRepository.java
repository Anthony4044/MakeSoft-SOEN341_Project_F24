package com.makesoft.MakeSoft;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface InstructorRepository extends JpaRepository<Instructor, Integer> {
    ArrayList<Instructor> findByEmail(String email);
    Optional<Instructor> findByEmailAndId(String email, Long id);

}
