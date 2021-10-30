package com.wspfeiffer.teams.repository;

import com.wspfeiffer.teams.domain.League;
import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;

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
