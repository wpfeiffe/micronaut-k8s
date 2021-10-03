import { Component, OnInit, ViewChild } from '@angular/core';
import { PlayerService } from "../player.service";
import { Observable } from "rxjs";
import { ClrDatagridStateInterface, ClrDatagrid, ClrDatagridPagination } from "@clr/angular";
import { Router } from "@angular/router";
import { Player } from "../../domain/domain";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  @ViewChild('datagrid', {static: false}) datagrid: ClrDatagrid;
  @ViewChild('pagination', {static: false}) pagination: ClrDatagridPagination;
  lastState: ClrDatagridStateInterface;

  players: Player[];
  playerToDelete: Player;
  total: number;
  loading: boolean = true;
  confirmDeleteOpen: boolean = false;
  currentPage: number = 1;

  constructor(private playerService: PlayerService,
              private router: Router) {
  }

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
    this.playerService.listForGrid(state).subscribe((result) => {
        this.players = result.content;
        this.total = result.totalSize;
        this.loading = false;
      },
      (error1) => {
        console.log(error1);
        this.loading = false;
      });
  }

  confirmDelete(player: Player) {
    this.playerToDelete = player;
    this.confirmDeleteOpen = true;
  }

  delete(id: number) {
    this.loading = true;
    this.playerService.delete(id).subscribe((result) => {
      this.loading = false;
      this.refresh(this.lastState);
    }, (error) => {
      console.log(error);
      this.loading = false;
    });
    this.confirmDeleteOpen = false;
  }
}
