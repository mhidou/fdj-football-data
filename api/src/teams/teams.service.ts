import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';
import { TeamDto } from './dto/team.dto/team.dto';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) { }

  async findTeamsByLeagueId(leagueId: string): Promise<TeamDto[]> {
    const teams = await this.teamModel.find({ leagues: leagueId });
    if (teams.length === 0) {
      throw new NotFoundException(`No teams has been found for league ${leagueId}`)
    }
    return teams;
  }
}