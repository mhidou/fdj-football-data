import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type LeagueDocument = League & Document;

@Schema()
export class League {
  @ApiProperty()
  @Prop()
  idLeague: string;

  @ApiProperty()
  @Prop()
  strLeague: string;
}

export const LeagueSchema = SchemaFactory.createForClass(League);