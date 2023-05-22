import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { PlayersService } from './players.service';
import { FindPlayersDto } from './dto/players-find.dto/find-players.dto';
import { PlayerDto } from './dto/player.dto/player.dto';

@Controller('players')
export class PlayersController {
  constructor(private readonly playersService: PlayersService) { }

  @Get('team/:teamId')
  findPlayersByTeam(@Param() params: FindPlayersDto): Promise<PlayerDto[]> {
    return this.playersService.findPlayersByTeam(params.teamId);
  }
}