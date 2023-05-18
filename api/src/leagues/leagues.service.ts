import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { League, LeagueDocument } from './schemas/league.schema';

@Injectable()
export class LeaguesService {
  constructor(
    @InjectModel(League.name) private readonly leagueModel: Model<LeagueDocument>,
  ) { }

  async findAll(): Promise<LeagueDocument[]> {
    return this.leagueModel.find();
  }
}