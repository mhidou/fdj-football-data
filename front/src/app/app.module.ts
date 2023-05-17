import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LeagueListComponent } from './league-list/league-list.component';
import { TeamListComponent } from './team-list/team-list.component';
import { PlayerListComponent } from './player-list/player-list.component';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
  path: 'leagues', component: LeagueListComponent,
}, {
  path: 'teams/:leagueId', component: TeamListComponent,
}, {
  path: 'players/:teamId', component: PlayerListComponent,
}, {
  path: '', redirectTo: 'leagues', pathMatch: 'full'
}]

@NgModule({
  declarations: [
    AppComponent,
    LeagueListComponent,
    TeamListComponent,
    PlayerListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
