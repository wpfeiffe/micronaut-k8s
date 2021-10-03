package com.wspfeiffer.teams.dto;

import com.wspfeiffer.teams.domain.Player;

import java.io.Serializable;
import java.util.Objects;

public class EmployeePlayer implements Serializable
{
    private static final long serialVersionUID = 1L;

    Employee employee;
    Player player;

    public EmployeePlayer(Employee employee, Player player)
    {
        this.employee = employee;
        this.player = player;
    }

    public Employee getEmployee()
    {
        return employee;
    }

    public void setEmployee(Employee employee)
    {
        this.employee = employee;
    }

    public Player getPlayer()
    {
        return player;
    }

    public void setPlayer(Player player)
    {
        this.player = player;
    }

    @Override
    public boolean equals(Object o)
    {
        if (this == o) return true;
        if (!(o instanceof EmployeePlayer)) return false;
        EmployeePlayer that = (EmployeePlayer) o;
        return getEmployee().equals(that.getEmployee()) &&
            getPlayer().equals(that.getPlayer());
    }

    @Override
    public int hashCode()
    {
        return Objects.hash(getEmployee(), getPlayer());
    }

    @Override
    public String toString()
    {
        return "EmployeePlayer{" +
            "employee=" + employee +
            ", player=" + player +
            '}';
    }
}
