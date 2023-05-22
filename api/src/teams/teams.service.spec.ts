import { Test, TestingModule } from '@nestjs/testing';
import { TeamsService } from './teams.service';
import { Team, TeamDocument } from './schemas/team.schema';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';

describe('TeamsService', () => {
  let service: TeamsService;
  let teamModel: Model<TeamDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TeamsService,
        {
          provide: getModelToken(Team.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<TeamsService>(TeamsService);
    teamModel = module.get<Model<TeamDocument>>(getModelToken(Team.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findTeamsByLeagueId', () => {
    it('should call teamModel.find with correct argument and return the result', async () => {
      const leagueId = '123';
      const expectedResult: Partial<TeamDocument>[] = [
        { idTeam: '1', strTeam: 'Team 1', strTeamBadge: 'Badge 1', leagues: ['123', '456'] },
        { idTeam: '2', strTeam: 'Team 2', strTeamBadge: 'Badge 2', leagues: ['123', '789'] },
      ];

      jest.spyOn(teamModel, 'find').mockReturnValueOnce(expectedResult as any);

      const result = await service.findTeamsByLeagueId(leagueId);

      expect(teamModel.find).toHaveBeenCalledWith({ leagues: leagueId });
      expect(result).toEqual(expectedResult);
    });
  });
});