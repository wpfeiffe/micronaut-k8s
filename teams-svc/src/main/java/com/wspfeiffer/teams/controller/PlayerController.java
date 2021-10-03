package com.wspfeiffer.teams.controller;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import io.reactivex.Single;
import com.wspfeiffer.teams.domain.Player;
import com.wspfeiffer.teams.dto.Employee;
import com.wspfeiffer.teams.dto.EmployeePlayer;
import com.wspfeiffer.teams.repository.AbstractPlayerRepository;
import com.wspfeiffer.teams.repository.PlayerRepository;
import com.wspfeiffer.teams.service.EmployeesClient;
import com.wspfeiffer.teams.service.EmployeesOperations;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import javax.inject.Inject;
import javax.transaction.Transactional;
import javax.validation.Valid;
import java.io.IOException;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Controller("/api/players")
public class PlayerController
{
    private static final ObjectMapper objectMapper = new ObjectMapper();
    private static final Logger LOG = LoggerFactory.getLogger(PlayerController.class);

    private final PlayerRepository playerRepository;
    private final AbstractPlayerRepository abstractPlayerRepository;
    private final EmployeesOperations employeesOperations;

    public PlayerController(AbstractPlayerRepository abstractPlayerRepository,
                            PlayerRepository playerRepository,
                            EmployeesOperations employeesOperations)
    {
        this.abstractPlayerRepository = abstractPlayerRepository;
        this.playerRepository = playerRepository;
        this.employeesOperations = employeesOperations;
    }

    @Get("/")
    public List<Player> all() {
        return (ArrayList<Player>) playerRepository.findAll();
    }

    @Get("/pageable{?pageable*}")
    public HttpResponse<Page<Player>> getByPage(Pageable pageable) {
        return HttpResponse.ok(playerRepository.list(pageable));
    }

    @Get("/{id}")
    public HttpResponse<Player> getById(Long id) {
        Player found = playerRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        return HttpResponse.ok(found);
    }

    @Get("/{id}/extended")
    public HttpResponse<EmployeePlayer> getExtendedById(Long id) {
        Employee employee = employeesOperations.findById(id).blockingGet();
        Player player = playerRepository.findById(id).orElse(null);
        if (player == null || employee == null ) {
            return HttpResponse.notFound();
        }

        player.setFullName(player.getFullName() + "Tes1");
        return HttpResponse.ok(new EmployeePlayer(employee, player));
    }

    @Get("/findBy{?fullName,position}")
    public HttpResponse<List<Player>> getFindBy(@QueryValue Optional<String> fullName, @QueryValue Optional<String> position) {
        if ((fullName.isEmpty() && position.isEmpty()) || (fullName.isPresent() && position.isPresent())) {
            return HttpResponse.badRequest();
        }
        else if (fullName.isPresent()) {
           List<Player> players = playerRepository.findByFullName(fullName.get());
            if (players == null) {
                return HttpResponse.notFound();
            }
            return HttpResponse.ok(players);
        }
        else {
            List<Player> players = playerRepository.findByPosition(position.get());
            if (players == null) {
                return HttpResponse.notFound();
            }
            return HttpResponse.ok(players);
        }
    }

    @Put("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Player> update(Long id, @Body @Valid Player player) {
        if (player.getId() == null || !player.getId().equals(id)) {
            return HttpResponse.badRequest();
        }
        Player updated = playerRepository.findById(id).orElse(null);
        if (updated == null) {
            return HttpResponse.notFound();
        }
        updated.setFullName(player.getFullName());
        updated.setPosition(player.getPosition());
        updated = playerRepository.save(updated);
        return HttpResponse.ok(updated);
    }

    @Post("/")
    public HttpResponse<Player> create(@Body @Valid Player player) {
        assert player.getId() == null;
        final Player updated = playerRepository.save(player);
        return HttpResponse.ok(updated);

    }

    @Delete("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Player> delete(Long id) {
        Player found = playerRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        playerRepository.delete(found);
        return HttpResponse.ok(found);
    }

    private URI toUri(Player player) {
        return URI.create("/player/" + player.getId());
    }
}
