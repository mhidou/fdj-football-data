import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schemas/team.schema';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Get('league/:leagueid')
  findTeamsByLeagueId(@Param('leagueid') leagueid: string): Promise<Team[]> {
    return this.teamsService.findTeamsByLeagueId(leagueid);
  }
}