import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ClrSpinner } from "@clr/angular";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { LeagueService } from "../league.service";
import { League } from "../../domain/domain";

@Component({
  selector: 'app-league-edit',
  templateUrl: './league-edit.component.html',
  styleUrls: ['./league-edit.component.css']
})
export class LeagueEditComponent implements OnInit {

  league: League;
  id: number;
  isLoaded: boolean;

  saveSuccess: boolean;
  saveError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private leagueService: LeagueService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      this.leagueService.read(this.id).subscribe(result => {
        this.league = result;
        this.isLoaded = true;
      }, error => {
        console.log('Error: ' + error);
      });
    } else {
      this.league = new class implements League {
        id: number = 0;
        leagueName: string = "";
      };
      this.isLoaded = true;
    }
  }

  save() {
    if (this.league.id > 0) {
      this.leagueService.update(this.league).subscribe(result => {
        // success
        this.saveSuccess = true;
        setTimeout(() => {
          this.saveSuccess = false;
        }, 3000);
      }, error => {
        // not success
        this.saveError = true;
        setTimeout(() => {
          this.saveError = false;
        }, 3000);
      });
    } else {
      this.leagueService.create(this.league).subscribe(result => {
        // success
        this.saveSuccess = true;
        setTimeout(() => {
          this.saveSuccess = false;
        }, 3000);
      }, error => {
        // not success
        this.saveError = true;
        setTimeout(() => {
          this.saveError = false;
        }, 3000);
      });
    }
  }
}
