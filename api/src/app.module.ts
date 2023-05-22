import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaguesModule } from './leagues/leagues.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { ScheduleModule } from '@nestjs/schedule';
import { FeedDataService } from './feed-data/feed-data.service';
import { HttpModule, HttpService } from '@nestjs/axios';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}`),
    ScheduleModule.forRoot(),
    LeaguesModule,
    TeamsModule,
    PlayersModule,
    HttpModule,
  ],
  controllers: [],
  providers: [FeedDataService],
})
export class AppModule {

}
