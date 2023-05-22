import {
  Controller,
  Get,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { League } from './schemas/league.schema';
import { LeagueDto } from './dto/league.dto/league.dto';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) { }

  @Get()
  async findAll(): Promise<LeagueDto[]> {
    const leagues = await this.leaguesService.findAll();
    return leagues;
  }
}