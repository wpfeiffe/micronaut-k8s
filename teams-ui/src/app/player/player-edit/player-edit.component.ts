import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from "@angular/router";
import { ClrSpinner } from "@clr/angular";
import { Observable } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Team, Player } from "../../domain/domain";
import { PlayerService } from "../player.service";
import { TeamService } from "../../team/team.service";

@Component({
  selector: 'app-player-edit',
  templateUrl: './player-edit.component.html',
  styleUrls: ['./player-edit.component.css']
})
export class PlayerEditComponent implements OnInit {

  player: Player;
  teams: Team[];
  id: number;
  isLoaded: boolean;
  teamId: string;

  saveSuccess: boolean;
  saveError: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private playerService: PlayerService,
    private teamService: TeamService) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  ngOnInit() {
    if (this.id > 0) {
      this.playerService.read(this.id).subscribe(result => {
        this.player = result;
        this.teamId = this.player.team.id.toString();
        this.isLoaded = true;
      }, error => {
        console.log('Error: ' + error);
      });
    } else {
      this.player = new class implements Player {
        fullName: string = "";
        id: number = 0;
        position: string = "";
        team: Team;
      }
    }

    this.teamService.list().subscribe(result => {
      this.teams = result;
      this.isLoaded = true;
    }, error => {
      console.log('Error: ' + error);
    });
  }

  save() {
    this.player.team = this.teams.find(team => team.id === parseInt(this.teamId));
    if (this.player.id > 0) {
      this.playerService.update(this.player).subscribe(result => {
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
      this.player.id = null;
      this.playerService.create(this.player).subscribe(result => {
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
