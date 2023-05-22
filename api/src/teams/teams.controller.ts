import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { TeamsService } from './teams.service';
import { Team } from './schemas/team.schema';
import { FindTeamsDto } from './dto/find-teams.dto/find-teams.dto';
import { TeamDto } from './dto/team.dto/team.dto';

@Controller('teams')
export class TeamsController {
  constructor(private readonly teamsService: TeamsService) { }

  @Get('league/:leagueId')
  findTeamsByLeagueId(@Param() params: FindTeamsDto): Promise<TeamDto[]> {
    return this.teamsService.findTeamsByLeagueId(params.leagueId);
  }
}