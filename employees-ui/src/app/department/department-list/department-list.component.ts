import { Component, OnInit, ViewChild } from '@angular/core';
import { DepartmentService } from "../department.service";
import { Observable } from "rxjs";
import { ClrDatagrid, ClrDatagridStateInterface } from "@clr/angular";
import { Router } from "@angular/router";
import { Department, Employee } from "../../domain/domain";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {

  @ViewChild('datagrid', {static: false}) datagrid: ClrDatagrid;
  lastState: ClrDatagridStateInterface;

  departments: Department[];
  deptToDelete: Department;
  total: number;
  loading: boolean = true;
  confirmDeleteOpen: boolean = false;


  constructor(private departmentService: DepartmentService,
              private router: Router) {
  }

  ngOnInit() {
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    this.lastState = state;
    this.departmentService.listForGrid(state).subscribe((result) => {
        this.departments = result.content;
        this.total = result.totalSize;
        this.loading = false;
      },
      (error1) => {
        console.log(error1);
        this.loading = false;
      });
  }

  confirmDelete(dept: Department) {
    this.deptToDelete = dept;
    this.confirmDeleteOpen = true;
  }

  delete(id: number) {
    this.loading = true;
    this.departmentService.delete(id).subscribe((result) => {
      this.loading = false;
      this.refresh(this.lastState)
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
    this.confirmDeleteOpen = false;
  }
}
