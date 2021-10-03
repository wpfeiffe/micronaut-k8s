import { Component, OnInit, ViewChild } from '@angular/core';
import { LeagueService } from "../league.service";
import { Observable } from "rxjs";
import { ClrDatagrid, ClrDatagridPagination, ClrDatagridStateInterface } from "@clr/angular";
import { Router } from "@angular/router";
import { League, Player } from "../../domain/domain";

@Component({
  selector: 'app-league-list',
  templateUrl: './league-list.component.html',
  styleUrls: ['./league-list.component.css']
})
export class LeagueListComponent implements OnInit {

  @ViewChild('datagrid', {static: false}) datagrid: ClrDatagrid;
  @ViewChild('pagination', {static: false}) pagination: ClrDatagridPagination;
  lastState: ClrDatagridStateInterface;

  leagues: League[];
  leagueToDelete: League;
  total: number;
  loading: boolean = true;
  confirmDeleteOpen: boolean = false;
  currentPage: number = 1;

  constructor(private leagueService: LeagueService,
              private router: Router) {
  }

  ngOnInit() {
    let lastPage = sessionStorage.getItem("league-current-page");
    if (lastPage) {
      this.currentPage = parseInt(lastPage);
    }
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    this.lastState = state;
    sessionStorage.setItem("league-current-page", this.currentPage.toString());

    this.leagueService.listForGrid(state).subscribe((result) => {
        this.leagues = result.content;
        this.total = result.totalSize;
        this.loading = false;
      },
      (error1) => {
        console.log(error1);
        this.loading = false;
      });
  }

  confirmDelete(league: League) {
    this.leagueToDelete = league;
    this.confirmDeleteOpen = true;
  }

  delete(id: number) {
    this.loading = true;
    this.leagueService.delete(id).subscribe((result) => {
      this.loading = false;
      this.refresh(this.lastState);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
    this.confirmDeleteOpen = false;
  }
}
