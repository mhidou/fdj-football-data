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
export class LeaguesModule {
  @InjectConnection() private connection: Connection;
  constructor(private readonly httpService: HttpService) { }

  @Cron('0 0 * * *')
  async handleCron() {
    // Reset all collections and get data from sportdb
    await this.connection.db.collection('leagues').deleteMany();
    await this.connection.db.collection('teams').deleteMany();
    await this.connection.db.collection('players').deleteMany();
    await this.feedData();
  }

  async onModuleInit() {
    const leaguesCollection = this.connection.db.collection('leagues');
    const leaguesNumber = await leaguesCollection.countDocuments();

    // If no league feed database from sportdb
    if (leaguesNumber === 0) {
      await this.feedData();
    }
  }

  async feedData() {
    const leagues = await lastValueFrom(this.httpService.get(process.env.LEAGUES_URL));

    const soccerLeagues = leagues.data?.leagues?.filter((l) => l?.strSport === 'Soccer') || []


    this.connection.db.collection('leagues').insertMany(soccerLeagues.map(l => ({
      idLeague: l.idLeague,
      strLeague: l.strLeague,
    })))

    for (let i = 0; i < soccerLeagues.length; i++) {
      const league = soccerLeagues[i];

      const teams = await lastValueFrom(this.httpService.get(process.env.TEAMS_URL, {
        params: {
          l: league.strLeague,
        }
      }));
      for (let i = 0; i < teams?.data?.teams?.length || 0; i++) {
        const team = teams?.data?.teams[i];

        const existingTeam = (await this.connection.db.collection('teams').find({ idTeam: { $eq: team.idTeam } }).toArray()).length > 0;

        if (!existingTeam) {
          const teamData = {
            idTeam: team.idTeam,
            strTeam: team.strTeam,
            strTeamBadge: team.strTeamBadge,
            leagues: [
              team.idLeague,
              ...(team.idLeague2 ? [team.idLeague2] : []),
              ...(team.idLeague3 ? [team.idLeague3] : []),
              ...(team.idLeague4 ? [team.idLeague4] : []),
              ...(team.idLeague5 ? [team.idLeague5] : []),
              ...(team.idLeague6 ? [team.idLeague6] : []),
              ...(team.idLeague7 ? [team.idLeague7] : []),
            ]
          };
          this.connection.db.collection('teams').insertOne(teamData);
          this.connection.db.collection('players').insertMany([{
            teamId: team.idTeam,
            name: 'Angel Di Maria',
            poste: 'Midfielder',
            birthDate: '1988-02-14',
            price: '1 000 000 $'
          }, {
            teamId: team.idTeam,
            name: 'Phil Foden',
            poste: 'Midfielder',
            birthDate: '1988-02-14',
            price: '1 000 000 $'
          }, {
            teamId: team.idTeam,
            name: 'Thiago Silva',
            poste: 'Defense',
            birthDate: '1988-02-14',
            price: '1 000 000 $'
          }, {
            teamId: team.idTeam,
            name: 'Erling Haaland',
            poste: 'Striker',
            birthDate: '1988-02-14',
            price: '1 000 000 $'
          }, {
            teamId: team.idTeam,
            name: 'Kylian Mbappé',
            poste: 'Striker',
            birthDate: '1988-02-14',
            price: '1 000 000 $'
          }, {
            teamId: team.idTeam,
            name: 'Karim Benzema',
            poste: 'Striker',
            birthDate: '1988-02-14',
            price: '1 000 000 $'
          }]);
        }
      }
    }
  }
}