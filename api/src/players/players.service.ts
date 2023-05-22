import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from './schemas/player.schema';
import { PlayerDto } from './dto/player.dto/player.dto';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<PlayerDocument>,
  ) { }
  async findPlayersByTeam(teamId: string): Promise<PlayerDto[]> {
    const players = await this.playerModel.find({ teamId: teamId });
    if (players.length === 0) {
      throw new NotFoundException(`No players has been found for team ${teamId}`)
    }
    return players;
  }
}