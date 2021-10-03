import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from "../employee.service";
import { Observable } from "rxjs";
import { ClrDatagrid, ClrDatagridPagination, ClrDatagridStateInterface, ClrModal } from "@clr/angular";
import { Router } from "@angular/router";
import { Employee } from "../../domain/domain";

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  @ViewChild('datagrid', {static: false}) datagrid: ClrDatagrid;
  @ViewChild('pagination', {static: false}) pagination: ClrDatagridPagination;
  lastState: ClrDatagridStateInterface;

  employees: Employee[];
  empToDelete: Employee;
  total: number;
  loading: boolean = true;
  confirmDeleteOpen: boolean = false;
  currentPage: number = 1;

  constructor(private employeeService: EmployeeService,
              private router: Router) {
  }

  ngOnInit() {
    let lastPage = sessionStorage.getItem("employee-current-page");
    if (lastPage) {
      this.currentPage = parseInt(lastPage);
    }
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    this.lastState = state;
    sessionStorage.setItem("employee-current-page", this.currentPage.toString())
    this.employeeService.listForGrid(state).subscribe((result) => {
        this.employees = result.content;
        this.total = result.totalSize;
        this.loading = false;
      },
      (error1) => {
        console.log(error1);
        this.loading = false;
      });
  }

  confirmDelete(emp: Employee) {
    this.empToDelete = emp;
    this.confirmDeleteOpen = true;
  }

  delete(id: number) {
    this.loading = true;
    this.employeeService.delete(id).subscribe((result) => {
      this.loading = false;
      this.refresh(this.lastState);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
    this.confirmDeleteOpen = false;
  }
}
