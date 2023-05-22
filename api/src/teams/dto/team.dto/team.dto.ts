import { IsString } from "class-validator";

export class TeamDto {
  @IsString()
  idTeam: string;

  @IsString()
  strTeam: string;

  @IsString()
  strTeamBadge: string;

  @IsString({ each: true })
  leagues: string[];
}
