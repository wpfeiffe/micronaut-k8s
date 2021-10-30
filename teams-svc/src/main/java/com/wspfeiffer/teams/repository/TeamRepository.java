package com.wspfeiffer.teams.repository;

import com.wspfeiffer.teams.domain.Team;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface TeamRepository extends CrudRepository<Team, Long> {
    List<Team> findByTeamCode(String teamCode);
    Page<Team> list(Pageable pageable);
}
