import { IsString } from "class-validator";

export class LeagueDto {
  @IsString()
  idLeague: string;

  @IsString()
  strLeague: string;
}
