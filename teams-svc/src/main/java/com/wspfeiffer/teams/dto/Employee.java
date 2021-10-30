package com.wspfeiffer.teams.dto;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.Objects;

public class Employee implements Serializable
{
    private static final long serialVersionUID = 1L;

    private Long id;
    private String firstName;
    private String lastName;
    private Boolean active;
    private LocalDate startDate;
    private String title;
    private Department department;

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

    public String getFirstName()
    {
        return firstName;
    }

    public void setFirstName(String firstName)
    {
        this.firstName = firstName;
    }

    public String getLastName()
    {
        return lastName;
    }

    public void setLastName(String lastName)
    {
        this.lastName = lastName;
    }

    public Boolean getActive()
    {
        return active;
    }

    public void setActive(Boolean active)
    {
        this.active = active;
    }

    public LocalDate getStartDate()
    {
        return startDate;
    }

    public void setStartDate(LocalDate startDate)
    {
        this.startDate = startDate;
    }

    public String getTitle()
    {
        return title;
    }

    public void setTitle(String title)
    {
        this.title = title;
    }

    public Department getDepartment()
    {
        return department;
    }

    public void setDepartment(Department department)
    {
        this.department = department;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (!(o instanceof Employee)) return false;
        Employee employee = (Employee) o;
        return getId().equals(employee.getId()) &&
            getFirstName().equals(employee.getFirstName()) &&
            getLastName().equals(employee.getLastName()) &&
            getActive().equals(employee.getActive()) &&
            getStartDate().equals(employee.getStartDate()) &&
            getTitle().equals(employee.getTitle()) &&
            getDepartment().equals(employee.getDepartment());
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(getId(), getFirstName(), getLastName(), getActive(), getStartDate(), getTitle(), getDepartment());
    }

    @Override
    public String toString()
    {
        return "Employee{" +
            "id=" + id +
            ", firstName='" + firstName + '\'' +
            ", lastName='" + lastName + '\'' +
            ", active=" + active +
            ", startDate=" + startDate +
            ", title='" + title + '\'' +
            ", department=" + department +
            '}';
    }
}

