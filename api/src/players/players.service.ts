import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Player, PlayerDocument } from './schemas/player.schema';

@Injectable()
export class PlayersService {
  constructor(
    @InjectModel(Player.name) private readonly playerModel: Model<PlayerDocument>,
  ) { }
  async findPlayersByTeam(teamId: string): Promise<PlayerDocument[]> {
    return this.playerModel.find({ teamId: teamId });
  }
}