import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlayerListComponent } from "./player/player-list/player-list.component";
import { TeamListComponent } from "./team/team-list/team-list.component";
import { LeagueListComponent } from "./league/league-list/league-list.component";
import {PlayerEditComponent} from "./player/player-edit/player-edit.component";
import {TeamEditComponent} from "./team/team-edit/team-edit.component";
import {LeagueEditComponent} from "./league/league-edit/league-edit.component";


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'players'},
  { path: 'players', component: PlayerListComponent},
  { path: 'players/:id', component: PlayerEditComponent},
  { path: 'teams', component: TeamListComponent},
  { path: 'teams/:id', component: TeamEditComponent},
  { path: 'leagues', component: LeagueListComponent},
  { path: 'leagues/:id', component: LeagueEditComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
