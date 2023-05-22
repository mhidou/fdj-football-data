import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesService } from './leagues.service';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { League, LeagueDocument } from './schemas/league.schema';

describe('LeaguesService', () => {
  let service: LeaguesService;
  let leagueModel: Model<LeagueDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        LeaguesService,
        {
          provide: getModelToken(League.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<LeaguesService>(LeaguesService);
    leagueModel = module.get<Model<LeagueDocument>>(getModelToken(League.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findAll', () => {
    it('should call leagueModel.find and return the result', async () => {
      const expectedResult = [{ name: 'Premier League' }, { name: 'La Liga' }];

      jest.spyOn(leagueModel, 'find').mockResolvedValue(expectedResult);

      const result = await service.findAll();

      expect(leagueModel.find).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});