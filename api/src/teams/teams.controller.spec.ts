import { Test, TestingModule } from '@nestjs/testing';
import { TeamsController } from './teams.controller';
import { TeamsService } from './teams.service';
import { getModelToken } from '@nestjs/mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { Model } from 'mongoose';

describe('TeamsController', () => {
  let controller: TeamsController;
  let teamsService: TeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeamsController],
      providers: [
        TeamsService,
        {
          provide: getModelToken(Team.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<TeamsController>(TeamsController);
    teamsService = module.get<TeamsService>(TeamsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findTeamsByLeagueId', () => {
    it('should call teamsService.findTeamsByLeagueId with correct argument', async () => {
      const leagueId = '123';
      const expectedResult: Partial<TeamDocument>[] = [
        { idTeam: '1', strTeam: 'Team 1', strTeamBadge: 'Badge 1', leagues: ['123', '456'] },
        { idTeam: '2', strTeam: 'Team 2', strTeamBadge: 'Badge 2', leagues: ['123', '789'] },
      ];

      jest.spyOn(teamsService, 'findTeamsByLeagueId').mockResolvedValue(expectedResult as TeamDocument[]);

      const result = await controller.findTeamsByLeagueId(leagueId);

      expect(teamsService.findTeamsByLeagueId).toHaveBeenCalledWith(leagueId);
      expect(result).toEqual(expectedResult);
    });
  });
});