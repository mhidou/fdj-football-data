import { IsString } from 'class-validator';

export class FindPlayersDto {
  @IsString()
  teamId: string;
}