import { Component, OnInit } from '@angular/core';
import { throwError, catchError } from 'rxjs';
import { League } from '../interfaces';
import { FootballDataService } from '../football-data.service';

@Component({
  selector: 'league-list',
  template: `
    <div id="league-list">
      <input type="text" placeholder="Search a league" (keyup)="filterLeagues($event)" />
      <ul>
        <li *ngFor="let league of filteredLeagues">
          <a class="league-link" [routerLink]="['/teams', league.idLeague]">
            {{league.strLeague}}
          </a>
        </li>
      </ul>
      <div *ngIf="errorMessage" class="error-message">{{ errorMessage }}</div>
    </div>
  `,
  styles: [
    '#league-list > input[type="text"] {font-size: 3.6vw; box-sizing: border-box; width: 100%; margin: 0 auto; border: none; border:solid 1px #ccc; border-radius: 10px; padding: 10px 20px;}',
    '#league-list a {font-size: 2.8vw}',
  ]
})
export class LeagueListComponent implements OnInit {
  leagues: League[] = [];
  filteredLeagues: League[] = [];
  errorMessage: string = '';

  constructor(private footballDataService: FootballDataService) { }

  // NOTE: KeyboardEvent event target doesn't have value attribute
  filterLeagues(event: any) {
    this.filteredLeagues = this.leagues.filter(l => (l.strLeague.toUpperCase()).includes(event?.target?.value.toUpperCase()))
  }

  ngOnInit(): void {
    this.footballDataService.getLeagues().pipe(
      catchError((error: any) => {
        this.errorMessage = 'An error occurred while fetching leagues. Please try again later.';
        return throwError(() => error);
      })
    ).subscribe(leagues => {
      this.filteredLeagues = this.leagues = leagues;
    })
  }
}
