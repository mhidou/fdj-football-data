import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { FootballDataService } from './football-data.service';
import { League, Team, Player } from './interfaces';

describe('FootballDataService', () => {
  let service: FootballDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [FootballDataService]
    });

    service = TestBed.inject(FootballDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getLeagues', () => {
    it('should retrieve leagues from the API', () => {
      const mockLeagues: League[] = [
        { idLeague: '1', strLeague: 'League 1' },
        { idLeague: '2', strLeague: 'League 2' }
      ];

      service.getLeagues().subscribe((leagues: League[]) => {
        expect(leagues).toEqual(mockLeagues);
      });

      const req = httpTestingController.expectOne('http://localhost:3000/leagues');
      expect(req.request.method).toEqual('GET');
      req.flush(mockLeagues);
    });
  });

  describe('getTeamsByLeague', () => {
    it('should retrieve teams for a specific league from the API', () => {
      const leagueId = '1';
      const mockTeams: Team[] = [
        { idTeam: '1', strTeam: 'Team 1', strTeamBadge: 'team1.png', leagues: ['1'] },
        { idTeam: '2', strTeam: 'Team 2', strTeamBadge: 'team2.png', leagues: ['1'] }
      ];

      service.getTeamsByLeague(leagueId).subscribe((teams: Team[]) => {
        expect(teams).toEqual(mockTeams);
      });

      const req = httpTestingController.expectOne(`http://localhost:3000/teams/league/${leagueId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockTeams);
    });
  });

  describe('getPlayersByTeam', () => {
    it('should retrieve players for a specific team from the API', () => {
      const teamId = '1';
      const mockPlayers: Player[] = [
        { teamId: '1', name: 'Player 1', poste: 'Position 1', birthDate: '1990-01-01', price: '100' },
        { teamId: '1', name: 'Player 2', poste: 'Position 2', birthDate: '1995-02-01', price: '150' }
      ];

      service.getPlayersByTeam(teamId).subscribe((players: Player[]) => {
        expect(players).toEqual(mockPlayers);
      });

      const req = httpTestingController.expectOne(`http://localhost:3000/players/team/${teamId}`);
      expect(req.request.method).toEqual('GET');
      req.flush(mockPlayers);
    });
  });
});
