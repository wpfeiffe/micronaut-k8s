package com.wspfeiffer.teams.dto;

import java.io.Serializable;
import java.util.Objects;

public class Company implements Serializable
{
    private static final long serialVersionUID = 1L;

    private Long id;
    private String companyName;

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getCompanyName()
    {
        return companyName;
    }

    public void setCompanyName(String companyName)
    {
        this.companyName = companyName;
    }

    @Override
    public String toString()
    {
        return "Company{" +
            "id=" + id +
            ", companyName='" + companyName + '\'' +
            '}';
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (!(o instanceof Company)) return false;
        Company company = (Company) o;
        return getId().equals(company.getId()) &&
            getCompanyName().equals(company.getCompanyName());
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(getId(), getCompanyName());
    }
}
