package com.wspfeiffer.employees.controller;

import io.micronaut.data.model.Page;
import io.micronaut.data.model.Pageable;
import io.micronaut.http.HttpHeaders;
import io.micronaut.http.HttpResponse;
import io.micronaut.http.annotation.*;
import com.wspfeiffer.employees.domain.Company;
import com.wspfeiffer.employees.repository.CompanyRepository;

import javax.transaction.Transactional;
import javax.validation.Valid;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@Controller("/api/companies")
public class CompanyController
{
    private final CompanyRepository companyRepository;

    public CompanyController(CompanyRepository companyRepository)
    {
        this.companyRepository = companyRepository;
    }

    @Get("/")
    public List<Company> all() {
        return (ArrayList<Company>) companyRepository.findAll();
    }

    @Get("/pageable{?pageable*}")
    public HttpResponse<Page<Company>> getByPage(Pageable pageable) {
        return HttpResponse.ok(companyRepository.list(pageable));
    }

    @Get("/{id}")
    public HttpResponse<Company> getById(Long id) {
        Company found = companyRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        return HttpResponse.ok(found);
    }

    @Put("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Company> update(Long id, @Body @Valid Company company) {
        if (company.getId() == null || !company.getId().equals(id)) {
            return HttpResponse.badRequest();
        }
        Company updated = companyRepository.findById(id).orElse(null);
        if (updated == null) {
            return HttpResponse.notFound();
        }
        updated.setCompanyName(company.getCompanyName());
        updated = companyRepository.save(updated);
        return HttpResponse.ok(updated);
    }

    @Post("/")
    public HttpResponse<Company> create(@Body @Valid Company company) {
        assert company.getId() == null;
        final Company updated = companyRepository.save(company);
        return HttpResponse.ok(updated);
    }

    @Delete("/{id}")
    @Transactional(value = Transactional.TxType.REQUIRED)
    public HttpResponse<Company> delete(Long id) {
        Company found = companyRepository.findById(id).orElse(null);
        if (found == null) {
            return HttpResponse.notFound();
        }
        companyRepository.delete(found);
        return HttpResponse.ok(found);
    }

    private URI toUri(Company company) {
        return URI.create("/company/" + company.getId());
    }
}
