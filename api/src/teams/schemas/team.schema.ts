import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @ApiProperty()
  @Prop({ required: true })
  idTeam: string;

  @ApiProperty()
  @Prop({ required: true })
  strTeam: string;

  @ApiProperty()
  @Prop({ required: true })
  strTeamBadge: string;

  @ApiProperty()
  @Prop({ required: true })
  leagues: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);