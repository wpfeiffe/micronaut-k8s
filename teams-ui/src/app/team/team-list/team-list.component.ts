import {Component, OnInit, ViewChild} from '@angular/core';
import {TeamService} from "../team.service";
import { Observable } from "rxjs";
import {ClrDatagrid, ClrDatagridPagination, ClrDatagridStateInterface} from "@clr/angular";
import { Router } from "@angular/router";
import {Player, Team} from "../../domain/domain";

@Component({
  selector: 'app-team-list',
  templateUrl: './team-list.component.html',
  styleUrls: ['./team-list.component.css']
})
export class TeamListComponent implements OnInit {

  @ViewChild('datagrid', {static: false}) datagrid: ClrDatagrid;
  @ViewChild('pagination', {static: false}) pagination: ClrDatagridPagination;
  lastState: ClrDatagridStateInterface;

  teams: Team[];
  teamToDelete: Team;
  total: number;
  loading: boolean = true;
  confirmDeleteOpen: boolean = false;
  currentPage: number = 1;

  constructor(private teamService: TeamService,
              private router: Router) { }

  ngOnInit() {
    let lastPage = sessionStorage.getItem("player-current-page");
    if (lastPage) {
      this.currentPage = parseInt(lastPage);
    }
  }

  refresh(state: ClrDatagridStateInterface) {
    this.loading = true;
    this.lastState = state;
    sessionStorage.setItem("player-current-page", this.currentPage.toString());
    this.teamService.listForGrid(state).subscribe((result) => {
        this.teams = result.content;
        this.total = result.totalSize;
        this.loading = false;
      },
      (error1) => {
        console.log(error1);
        this.loading = false;
      });
  }

  confirmDelete(team: Team) {
    this.teamToDelete = team;
    this.confirmDeleteOpen = true;
  }

  delete(id: number) {
    this.loading = true;
    this.teamService.delete(id).subscribe((result) => {
      this.loading = false;
      this.refresh(this.lastState);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
    this.confirmDeleteOpen = false;
  }
}
