import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) { }

  async findTeamsByLeagueId(leagueId: string): Promise<TeamDocument[]> {
    const teams = this.teamModel.find<TeamDocument>({ leagues: leagueId });
    return teams
  }
}