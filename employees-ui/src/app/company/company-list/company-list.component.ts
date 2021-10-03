import { Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from "../company.service";
import { Observable } from "rxjs";
import { ClrDatagrid, ClrDatagridStateInterface } from "@clr/angular";
import { Router } from "@angular/router";
import { Company, Employee } from "../../domain/domain";

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {

  @ViewChild('datagrid', {static: false}) datagrid: ClrDatagrid;
  lastState: ClrDatagridStateInterface;

  companies: Company[];
  companyToDelete: Company;
  total: number;
  loading: boolean = true;
  confirmDeleteOpen: boolean = false;

  constructor(private companyService: CompanyService,
              private router: Router) {
  }

  ngOnInit() {
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    this.lastState = state;

    this.companyService.listForGrid(state).subscribe((result) => {
        this.companies = result.content;
        this.total = result.totalSize;
        this.loading = false;
      },
      (error1) => {
        console.log(error1);
        this.loading = false;
      });
  }

  confirmDelete(company: Company) {
    this.companyToDelete = company;
    this.confirmDeleteOpen = true;
  }

  delete(id: number) {
    this.loading = true;
    this.companyService.delete(id).subscribe((result) => {
      this.loading = false;
      this.refresh(this.lastState);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
    this.confirmDeleteOpen = false;
  }
}
