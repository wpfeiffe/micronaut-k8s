package com.wspfeiffer.teams.repository;

import io.micronaut.data.annotation.Repository;
import io.micronaut.data.repository.CrudRepository;
import com.wspfeiffer.teams.domain.Player;

import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@Repository
public abstract class AbstractPlayerRepository implements CrudRepository<Player, Long>
{
    private final EntityManager entityManager;

    public AbstractPlayerRepository(EntityManager entityManager)
    {
        this.entityManager = entityManager;
    }

    @Transactional(value = Transactional.TxType.REQUIRED)
    public Player update(Player player) {
        return this.entityManager.merge(player);
    }
}
