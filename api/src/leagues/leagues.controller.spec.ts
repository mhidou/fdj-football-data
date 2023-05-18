import { Test, TestingModule } from '@nestjs/testing';
import { LeaguesController } from './leagues.controller';
import { LeaguesService } from './leagues.service';
import { League, LeagueDocument } from './schemas/league.schema';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';

describe('LeaguesController', () => {
  let controller: LeaguesController;
  let leaguesService: LeaguesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LeaguesController],
      providers: [
        LeaguesService,
        {
          provide: getModelToken(League.name),
          useValue: Model,
        },
      ],
    }).compile();

    controller = module.get<LeaguesController>(LeaguesController);
    leaguesService = module.get<LeaguesService>(LeaguesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should call leaguesService.findAll and return the result', async () => {
      const expectedResult: Partial<LeagueDocument>[] = [
        {
          _id: '1',
          idLeague: '1',
          strLeague: 'Premier League',
        },
        {
          _id: '2',
          idLeague: '2',
          strLeague: 'La Liga',
        },
      ];

      jest.spyOn(leaguesService, 'findAll').mockResolvedValue(expectedResult as LeagueDocument[]);

      const result = await controller.findAll();

      expect(leaguesService.findAll).toHaveBeenCalled();
      expect(result).toEqual(expectedResult);
    });
  });
});