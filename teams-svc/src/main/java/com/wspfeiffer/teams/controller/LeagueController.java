package com.wspfeiffer.teams.controller;

import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import com.wspfeiffer.teams.domain.League;
import com.wspfeiffer.teams.repository.LeagueRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Controller("/api/leagues")
public class LeagueController
{
    private final LeagueRepository leagueRepository;

    public LeagueController(LeagueRepository leagueRepository)
    {
        this.leagueRepository = leagueRepository;
    }

    @Get("/")
    public List<League> all() {
        return (ArrayList<League>) leagueRepository.findAll();
    }

    @Get("/pageable{?pageable*}")
    public HttpResponse<Page<League>> getByPage(Pageable pageable) {
        return HttpResponse.ok(leagueRepository.list(pageable));
    }

    @Get("/{id}")
    public HttpResponse<League> getById(Long id) {
        League found = leagueRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        return HttpResponse.ok(found);
    }

    @Put("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<League> update(Long id, @Body @Valid League league) {
        if (league.getId() == null || !league.getId().equals(id)) {
            return HttpResponse.badRequest();
        }
        League updated = leagueRepository.findById(id).orElse(null);
        if (updated == null) {
            return HttpResponse.notFound();
        }
        updated.setLeagueName(league.getLeagueName());
        updated = leagueRepository.save(updated);
        return HttpResponse.ok(updated);

    }

    @Post("/")
    public HttpResponse<League> create(@Body @Valid League league) {
        assert league.getId() == null;
        final League updated = leagueRepository.save(league);
        return HttpResponse.ok(updated);

    }

    @Delete("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<League> delete(Long id) {
        League found = leagueRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        leagueRepository.delete(found);
        return HttpResponse.ok(found);
    }

    private URI toUri(League league) {
        return URI.create("/league/" + league.getId());
    }
}
