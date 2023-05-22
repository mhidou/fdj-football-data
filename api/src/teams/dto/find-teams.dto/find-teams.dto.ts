import { IsString } from 'class-validator';

export class FindTeamsDto {
  @IsString()
  leagueId: string;
}