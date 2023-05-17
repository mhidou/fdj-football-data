import {
  Controller,
  Get,
} from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { League } from './schemas/league.schema';

@Controller('leagues')
export class LeaguesController {
  constructor(private readonly leaguesService: LeaguesService) { }

  @Get()
  findAll(): Promise<League[]> {
    return this.leaguesService.findAll();
  }
}