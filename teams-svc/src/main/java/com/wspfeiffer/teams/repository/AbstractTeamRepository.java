package com.wspfeiffer.teams.repository;

import com.wspfeiffer.teams.domain.Team;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

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
