import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { League } from '../interfaces';
import { FootballDataService } from '../football-data.service';

@Component({
  selector: 'league-list',
  template: `
    <div id="league-list">
      <input type="text" placeholder="Search a league" (keyup)="filterLeagues($event)" />
      <ul>
        <li *ngFor="let league of filteredLeagues">
          <a [routerLink]="['/teams', league.idLeague]">
            {{league.strLeague}}
          </a>
        </li>
      </ul>
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

  constructor(private footballDataService: FootballDataService) { }

  // NOTE: KeyboardEvent event target doesn't have value attribute
  filterLeagues(event: any) {
    this.filteredLeagues = this.leagues.filter(l => (l.strLeague.toUpperCase()).includes(event?.target?.value.toUpperCase()))
  }

  ngOnInit(): void {
    this.footballDataService.getLeagues().subscribe(leagues => {
      this.filteredLeagues = this.leagues = leagues;
    })
  }
}
