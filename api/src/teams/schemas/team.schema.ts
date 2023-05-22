import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type TeamDocument = Team & Document;

@Schema()
export class Team {
  @Prop({ required: true })
  idTeam: string;

  @Prop({ required: true })
  strTeam: string;

  @Prop({ required: true })
  strTeamBadge: string;

  @Prop({ required: true })
  leagues: string[];
}

export const TeamSchema = SchemaFactory.createForClass(Team);