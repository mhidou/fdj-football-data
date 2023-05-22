import { Logger, Module } from '@nestjs/common';
import { LeaguesService } from './leagues.service';
import { LeaguesController } from './leagues.controller';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { League, LeagueSchema } from './schemas/league.schema';
import { Connection } from 'mongoose';
import { HttpModule, HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { Cron } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: League.name,
        schema: LeagueSchema,
      },
    ]),
    HttpModule,
  ],
  controllers: [LeaguesController],
  providers: [LeaguesService],
})
export class LeaguesModule { }