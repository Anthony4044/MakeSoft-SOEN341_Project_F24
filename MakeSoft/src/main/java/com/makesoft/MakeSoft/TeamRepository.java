package com.makesoft.MakeSoft;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

public interface TeamRepository extends JpaRepository<Team, Long> {
    ArrayList<Team> findBySection(String section);
    Optional<Team> findByTeamName(String teamName);
    Optional<Team> findByTeamId(Long teamId);
}
