package com.makesoft.MakeSoft;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;

public interface TeamRepository extends JpaRepository<Team, Long> {
    ArrayList<Team> findBySection(String section);
    ArrayList<Team> findByTeamName(String teamName);
}
