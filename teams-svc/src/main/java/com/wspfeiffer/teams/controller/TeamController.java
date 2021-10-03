package com.wspfeiffer.teams.controller;

import com.sun.istack.Nullable;
import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import com.wspfeiffer.teams.domain.Team;
import com.wspfeiffer.teams.repository.TeamRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Controller("/api/teams")
public class TeamController
{
    private final TeamRepository teamRepository;

    public TeamController(TeamRepository teamRepository)
    {
        this.teamRepository = teamRepository;
    }

    @Get("/pageable{?pageable*}")
    public HttpResponse<Page<Team>> getByPage(Pageable pageable) {
        return HttpResponse.ok(teamRepository.list(pageable));
    }

    @Get("/")
    public List<Team> all() {
        return (ArrayList<Team>) teamRepository.findAll();
    }

    @Get("/{id}")
    public HttpResponse<Team> getById(Long id) {
        Team found = teamRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        return HttpResponse.ok(found);
    }

    @Get("/findBy{?teamCode}")
    public HttpResponse<List<Team>> getFindBy(@QueryValue @Nullable String teamCode) {
        if (teamCode == null) {
            return HttpResponse.badRequest();
        }
        else {
            return HttpResponse.ok(teamRepository.findByTeamCode(teamCode));
        }
    }



    @Put("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Team> update(Long id, @Body @Valid Team team) {
         if (team.getId() == null || !team.getId().equals(id)) {
            return HttpResponse.badRequest();
        }
        Team updated = teamRepository.findById(id).orElse(null);
        if (updated == null) {
            return HttpResponse.notFound();
        }
        updated.setTeamCode(team.getTeamCode());
        updated.setTeamName(team.getTeamName());
        updated = teamRepository.save(updated);
        return HttpResponse.ok(updated);
    }

    @Post("/")
    public HttpResponse<Team> create(@Body @Valid Team team) {
        assert team.getId() == null;
        final Team updated = teamRepository.save(team);
        return HttpResponse.ok(updated);

    }

    @Delete("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Team> delete(Long id) {
        Team found = teamRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        teamRepository.delete(found);
        return HttpResponse.ok(found);
    }

    private URI toUri(Team team) {
        return URI.create("/team/" + team.getId());
    }
}
