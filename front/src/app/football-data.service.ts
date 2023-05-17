import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { League, Player, Team } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class FootballDataService {
  constructor(private http: HttpClient) { }

  getLeagues(): Observable<League[]> {
    return this.http.get<League[]>('http://localhost:3000/leagues')
  }

  getTeamsByLeague(leagueId: string): Observable<Team[]> {
    return this.http.get<Team[]>(`http://localhost:3000/teams/league/${leagueId}`)
  }

  getPlayersByTeam(teamId: string): Observable<Player[]> {
    return this.http.get<Player[]>(`http://localhost:3000/players/team/${teamId}`)
  }
}
