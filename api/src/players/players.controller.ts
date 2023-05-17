import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { Player } from './schemas/player.schema';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) { }

  @Get('team/:teamId')
  findPlayersByTeam(@Param('teamId') teamId: string): Promise<Player[]> {
    return this.playersService.findPlayersByTeam(teamId);
  }
}