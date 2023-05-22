import { Test, TestingModule } from '@nestjs/testing';
import { PlayersService } from './players.service';
import { getModelToken } from '@nestjs/mongoose';
import { Player, PlayerDocument } from './schemas/player.schema';
import { Model } from 'mongoose';

describe('PlayersService', () => {
  let service: PlayersService;
  let playerModel: Model<PlayerDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PlayersService,
        {
          provide: getModelToken(Player.name),
          useValue: {
            find: jest.fn().mockReturnThis(),
          },
        },
      ],
    }).compile();

    service = module.get<PlayersService>(PlayersService);
    playerModel = module.get<Model<PlayerDocument>>(getModelToken(Player.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('findPlayersByTeam', () => {
    it('should call playerModel.find with correct arguments', async () => {
      const teamId = '123';

      await service.findPlayersByTeam(teamId);

      expect(playerModel.find).toHaveBeenCalledWith({ teamId: teamId });
    });
  });
});
