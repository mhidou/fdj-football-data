import { Component, OnInit } from '@angular/core';
import { Player } from '../interfaces';
import { FootballDataService } from '../football-data.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-player-list',
  template: `
    <div id="player-list">
      <div *ngFor="let player of players" class="player">
        <div class="image">
          <img src="https://cdn-icons-png.flaticon.com/512/727/727399.png"/>
        </div>

        <div class="details">
          <span class="name">{{player.mame}}</span>
          <span>{{player.poste}}</span>
          <span>{{player.poste}}</span>
          <span>BirthDate: {{player.birthDate}}</span>
          <span>{{player.price}}</span>
        </div>
      </div>
    </div>
  `,
  styles: [
    '#player-list {display: flex; width: 100%; flex-direction: column;}',
    '#player-list .player {display: flex; flex: 1; flex-direction: row; background-color: #efeff4; margin-bottom: 10px}',
    '#player-list .player .image {flex: 1; text-align: center;}',
    '#player-list .player .image img {max-width:100%; padding: 20px 10px}',
    '#player-list .player .details {display: flex; flex: 2; flex-direction: column; color: #bdbdbf; justify-content: center; font-size: 3.2vw}',
    '#player-list .player .details .name {color: #1b1b1b; font-weight: bold}',

  ]
})
export class PlayerListComponent implements OnInit {
  teamId: string | null = '';
  players: Player[] = [];
  constructor(
    private footballDataService: FootballDataService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {
    this.teamId = this.route.snapshot.paramMap.get('teamId')
    this.footballDataService.getPlayersByTeam(this.teamId || '').subscribe(players => {
      this.players = players;
    })
  }
}
