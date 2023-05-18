import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { LeagueListComponent } from './league-list.component';
import { FootballDataService } from '../football-data.service';
import { League } from '../interfaces';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('LeagueListComponent', () => {
  let component: LeagueListComponent;
  let fixture: ComponentFixture<LeagueListComponent>;
  let footballDataService: FootballDataService;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      declarations: [LeagueListComponent],
      providers: [FootballDataService]
    });

    fixture = TestBed.createComponent(LeagueListComponent);
    component = fixture.componentInstance;
    footballDataService = TestBed.inject(FootballDataService);
    router = TestBed.inject(Router);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // it('should retrieve leagues from the API on initialization', async () => {
  //   const mockLeagues: League[] = [
  //     { idLeague: '1', strLeague: 'League 1' },
  //     { idLeague: '2', strLeague: 'League 2' }
  //   ];

  //   spyOn(footballDataService, 'getLeagues').and.returnValue(of(mockLeagues));

  //   fixture.detectChanges();

  //   await fixture.whenStable();

  //   expect(component.leagues).toEqual(mockLeagues);
  //   expect(component.filteredLeagues).toEqual(mockLeagues);
  // });

  it('should filter leagues based on search input', () => {
    const mockLeagues: League[] = [
      { idLeague: '1', strLeague: 'Premier League' },
      { idLeague: '2', strLeague: 'La Liga' },
      { idLeague: '3', strLeague: 'Bundesliga' },
      { idLeague: '4', strLeague: 'Serie A' }
    ];

    component.leagues = mockLeagues;

    // Simulate search input
    component.filterLeagues({ target: { value: 'L' } });

    expect(component.filteredLeagues.length).toBe(3);
    expect(component.filteredLeagues[0].strLeague).toBe('Premier League');
    expect(component.filteredLeagues[1].strLeague).toBe('La Liga');
    expect(component.filteredLeagues[2].strLeague).toBe('Bundesliga');

    // Simulate search input
    component.filterLeagues({ target: { value: 'Serie' } });

    expect(component.filteredLeagues.length).toBe(1);
    expect(component.filteredLeagues[0].strLeague).toBe('Serie A');
  });

  // it('should navigate to the team list when a league is clicked', async () => {
  //   const mockLeagues: League[] = [
  //     { idLeague: '1', strLeague: 'League 1' },
  //     { idLeague: '2', strLeague: 'League 2' }
  //   ];

  //   component.leagues = mockLeagues;
  //   fixture.detectChanges();
  //   await fixture.whenStable();

  //   debugger;


  //   const leagueLink = fixture.nativeElement.querySelector('a');
  //   spyOn(router, 'navigate');

  //   leagueLink.click();

  //   expect(router.navigate).toHaveBeenCalledWith(['/teams', '1']);
  // });
});
