package com.wspfeiffer.teams.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.teams.domain.League;

import javax.persistence.EntityManager;

@Repository
public abstract class AbstractLeagueyRepository implements CrudRepository<League, Long>
{
    private final EntityManager entityManager;

    public AbstractLeagueyRepository(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

}
