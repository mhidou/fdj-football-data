import { Test, TestingModule } from '@nestjs/testing';
import { PlayersController } from './players.controller';
import { PlayersService } from './players.service';
import { Player, PlayerDocument } from './schemas/player.schema';
import { getModelToken } from '@nestjs/mongoose';

describe('PlayersController', () => {
  let controller: PlayersController;
  let playersService: PlayersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlayersController],
      providers: [PlayersService,
        {
          provide: getModelToken(Player.name),
          useValue: {
            find: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<PlayersController>(PlayersController);
    playersService = module.get<PlayersService>(PlayersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findPlayersByTeam', () => {
    it('should call playersService.findPlayersByTeam with correct argument', async () => {
      const teamId = '123';
      const expectedResult: Partial<PlayerDocument>[] = [
        {
          _id: '1',
          teamId: '123',
          name: 'Angel Di Maria',
          poste: 'Midfielder',
          birthDate: '1988-02-14',
          price: '1,000,000',
        },
        {
          _id: '2',
          teamId: '123',
          name: 'Phil Foden',
          poste: 'Midfielder',
          birthDate: '1990-05-28',
          price: '2,000,000',
        },
      ];

      jest.spyOn(playersService, 'findPlayersByTeam').mockResolvedValue(expectedResult as PlayerDocument[]);

      const result = await controller.findPlayersByTeam(teamId);

      expect(playersService.findPlayersByTeam).toHaveBeenCalledWith(teamId);
      expect(result).toEqual(expectedResult);
    });
  });
});