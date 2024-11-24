package com.makesoft.makesoft.repository;

import com.makesoft.makesoft.classes.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.ArrayList;
import java.util.Optional;

/**
 * Repository interface for managing Team entities.
 */
public interface TeamRepository extends JpaRepository<Team, Long> {

    /**
     * Finds teams by their section.
     *
     * @param section the section of the team
     * @return a list of teams in the specified section
     */
    ArrayList<Team> findBySection(String section);

    /**
     * Finds a team by its name.
     *
     * @param teamName the name of the team
     * @return an Optional containing the team if found, or empty if not found
     */
    Optional<Team> findByTeamName(String teamName);

    /**
     * Finds a team by its unique team ID.
     *
     * @param teamId the unique team ID
     * @return an Optional containing the team if found, or empty if not found
     */
    Optional<Team> findByTeamId(Long teamId);
}