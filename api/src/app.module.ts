import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LeaguesModule } from './leagues/leagues.module';
import { TeamsModule } from './teams/teams.module';
import { PlayersModule } from './players/players.module';
import { ScheduleModule } from '@nestjs/schedule';

@Module({
  imports: [
    MongooseModule.forRoot(`${process.env.MONGODB_URL}/${process.env.MONGODB_DATABASE}`),
    ScheduleModule.forRoot(),
    LeaguesModule,
    TeamsModule,
    PlayersModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {

}
