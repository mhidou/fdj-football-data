import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { League, LeagueDocument } from './schemas/league.schema';
import { HttpService } from '@nestjs/axios';
import { Cron } from '@nestjs/schedule';
import { lastValueFrom } from 'rxjs';
import { LeagueDto } from './dto/league.dto/league.dto';

@Injectable()
export class LeaguesService {

  constructor(
    @InjectModel(League.name) private readonly leagueModel: Model<LeagueDocument>,
  ) { }

  async findAll(): Promise<LeagueDto[]> {
    const leagues = await this.leagueModel.find();

    if (leagues.length === 0) {
      throw new NotFoundException('No leagues has been found')
    }
    return leagues;
  }
}