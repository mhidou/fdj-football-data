import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FootballDataService } from '../football-data.service';
import { Team } from '../interfaces';

@Component({
  selector: 'app-team-list',
  template: `
    <div id="team-list">
      <div *ngFor="let team of teams">
        <a [routerLink]="['/players', team.idTeam]">
        <img [src]="[team.strTeamBadge]" alt="{{team.strTeam}}" />
        </a>
      </div>
    </div>
  `,
  styles: [
    '#team-list {display: grid; grid-template-columns: 1fr 1fr; gap: 20px;}',
    '#team-list img {width: 100%}',
  ]
})
export class TeamListComponent implements OnInit {
  leagueId: string | null = '';
  teams: Team[] = [];
  constructor(
    private footballDataService: FootballDataService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.leagueId = this.route.snapshot.paramMap.get('leagueId')
    this.footballDataService.getTeamsByLeague(this.leagueId || '').subscribe(teams => {
      this.teams = teams;
    })
  }
}
