package com.wspfeiffer.teams.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.teams.domain.League;

@Repository
public interface LeagueRepository extends CrudRepository<League, Long> {
    Page<League> list(Pageable pageable);
}
