import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

import { PlayerListComponent } from './player-list.component';
import { FootballDataService } from '../football-data.service';
import { Player } from '../interfaces';

describe('PlayerListComponent', () => {
  let component: PlayerListComponent;
  let fixture: ComponentFixture<PlayerListComponent>;
  let footballDataService: FootballDataService;
  let route: ActivatedRoute;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [PlayerListComponent],
      providers: [FootballDataService, {
        provide: ActivatedRoute,
        useValue: {
          snapshot: {
            paramMap: {
              get: (key: string) => {
                if (key === 'teamId') {
                  return '123'; // Replace with the desired teamId value
                }
                return null; // Return a default value if the key doesn't match
              }
            }
          }
        }
      }]
    });

    fixture = TestBed.createComponent(PlayerListComponent);
    component = fixture.componentInstance;
    footballDataService = TestBed.inject(FootballDataService);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch players for a specific team on component initialization', () => {
    const teamId = '123'; // Replace with the desired teamId value
    const players: Player[] = [
      { teamId: '123', name: 'Player 1', poste: 'Position 1', birthDate: '1990-01-01', price: '10000000' },
      { teamId: '123', name: 'Player 2', poste: 'Position 2', birthDate: '1995-02-01', price: '15000000' }
    ];

    spyOn(footballDataService, 'getPlayersByTeam').and.returnValue(of(players));

    component.ngOnInit();

    expect(footballDataService.getPlayersByTeam).toHaveBeenCalledWith(teamId);
    expect(component.players).toEqual(players);
  });
});
