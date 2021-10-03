package com.wspfeiffer.teams.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.teams.domain.Team;

import javax.persistence.EntityManager;

@Repository
public abstract class AbstractTeamRepository implements CrudRepository<Team, Long>
{
    private final EntityManager entityManager;

    public AbstractTeamRepository(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }
}
