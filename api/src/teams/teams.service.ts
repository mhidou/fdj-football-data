import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Query } from 'mongoose';
import { Team, TeamDocument } from './schemas/team.schema';

@Injectable()
export class TeamsService {
  constructor(
    @InjectModel(Team.name) private readonly teamModel: Model<TeamDocument>,
  ) { }

  findTeamsByLeagueId(leagueId: string): Query<TeamDocument[], TeamDocument, {}, TeamDocument, "find"> {
    const teams = this.teamModel.find<TeamDocument>({ leagues: leagueId });
    if (!teams) {
      throw new NotFoundException(`There is no teams for league ${leagueId}`)
    }
    return teams
  }
}