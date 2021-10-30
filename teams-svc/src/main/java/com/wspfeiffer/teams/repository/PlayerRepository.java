package com.wspfeiffer.teams.repository;

import com.wspfeiffer.teams.domain.Player;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.data.repository.CrudRepository;

import java.util.List;

@Repository
public interface PlayerRepository extends CrudRepository<Player, Long> {
    List<Player> findByFullName(String fullName);
    List<Player> findByPosition(String position);
    Page<Player> list(Pageable pageable);
}
