import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ClarityModule } from '@clr/angular';
import { ClrSpinnerModule } from "@clr/angular";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";
import { PlayerListComponent } from './player/player-list/player-list.component';
import { TeamListComponent } from "./team/team-list/team-list.component";
import { LeagueListComponent } from "./league/league-list/league-list.component";
import { PlayerEditComponent } from './player/player-edit/player-edit.component';
import { TeamEditComponent } from "./team/team-edit/team-edit.component";
import { LeagueEditComponent } from "./league/league-edit/league-edit.component";

@NgModule({
  declarations: [
    AppComponent,
    PlayerListComponent,
    TeamListComponent,
    LeagueListComponent,
    PlayerEditComponent,
    TeamEditComponent,
    LeagueEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ClarityModule,
    ClrSpinnerModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
