import { IsString } from "class-validator";

export class PlayerDto {
  @IsString()
  teamId: string;

  @IsString()
  name: string;

  @IsString()
  poste: string;

  @IsString()
  birthDate: string;

  @IsString()
  price: string;
}
