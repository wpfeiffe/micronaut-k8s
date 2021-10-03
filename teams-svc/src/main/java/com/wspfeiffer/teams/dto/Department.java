package com.wspfeiffer.teams.dto;

import java.io.Serializable;
import java.util.Objects;

public class Department implements Serializable
{

    private static final long serialVersionUID = 1L;

    private Long id;
    private String deptCode;
    private String deptName;
    private Company company;

    public static long getSerialVersionUID()
    {
        return serialVersionUID;
    }

    public Long getId()
    {
        return id;
    }

    public void setId(Long id)
    {
        this.id = id;
    }

    public String getDeptCode()
    {
        return deptCode;
    }

    public void setDeptCode(String deptCode)
    {
        this.deptCode = deptCode;
    }

    public String getDeptName()
    {
        return deptName;
    }

    public void setDeptName(String deptName)
    {
        this.deptName = deptName;
    }

    public Company getCompany()
    {
        return company;
    }

    public void setCompany(Company company)
    {
        this.company = company;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (!(o instanceof Department)) return false;
        Department that = (Department) o;
        return getId().equals(that.getId()) &&
            getDeptCode().equals(that.getDeptCode()) &&
            getDeptName().equals(that.getDeptName()) &&
            getCompany().equals(that.getCompany());
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(getId(), getDeptCode(), getDeptName(), getCompany());
    }
}
