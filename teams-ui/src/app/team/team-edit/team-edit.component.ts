import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {ClrSpinner} from "@clr/angular";
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {League, Team} from "../../domain/domain";
import {TeamService} from "../team.service";
import {LeagueService} from "../../league/league.service";

@Component({
  selector: 'app-team-edit',
  templateUrl: './team-edit.component.html',
  styleUrls: ['./team-edit.component.css']
})
export class TeamEditComponent implements OnInit {

  team: Team;
  leagues: League[];
  id: number;
  isLoaded: boolean;
  leagueId: string;

  saveSuccess: boolean;
  saveError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private teamService: TeamService,
    private leagueService: LeagueService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      this.teamService.read(this.id).subscribe(result => {
        this.team = result;
        this.leagueId = this.team.league.id.toString();
        this.isLoaded = true;
      }, error => {
        console.log('Error: ' + error);
      });
    }
    else {
      this.team = new class implements Team {
        id: number = 0;
        league: League;
        teamCode: string = "";
        teamName: string = "";
      }
    }

    this.leagueService.list().subscribe(result => {
      this.leagues = result;
      this.isLoaded = true;
    }, error => {
      console.log('Error: ' + error);
    });
  }

  save() {
    this.team.league = this.leagues.find(league => league.id === parseInt(this.leagueId));
    if (this.team.id > 0) {
      this.teamService.update(this.team).subscribe(result => {
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
    else {
      this.team.id = null;
      this.teamService.create(this.team).subscribe(result => {
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
