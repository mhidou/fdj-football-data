import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TeamListComponent } from './team-list.component';
import { FootballDataService } from '../football-data.service';
import { Team } from '../interfaces';

describe('TeamListComponent', () => {
  let component: TeamListComponent;
  let fixture: ComponentFixture<TeamListComponent>;
  let footballDataService: FootballDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [TeamListComponent],
      providers: [
        FootballDataService,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => 'leagueId'
              }
            }
          }
        }
      ]
    });

    fixture = TestBed.createComponent(TeamListComponent);
    component = fixture.componentInstance;
    footballDataService = TestBed.inject(FootballDataService);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch teams for a specific league on component initialization', () => {
    const leagueId = 'leagueId';
    const teams: Team[] = [
      { idTeam: '1', strTeam: 'Team 1', strTeamBadge: 'team1.png', leagues: ['leagueId'] },
      { idTeam: '2', strTeam: 'Team 2', strTeamBadge: 'team2.png', leagues: ['leagueId'] }
    ];

    spyOn(footballDataService, 'getTeamsByLeague').and.returnValue(of(teams));

    component.ngOnInit();

    expect(footballDataService.getTeamsByLeague).toHaveBeenCalledWith(leagueId);
    expect(component.teams).toEqual(teams);
  });
});
