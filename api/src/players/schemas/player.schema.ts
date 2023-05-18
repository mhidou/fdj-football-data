import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @ApiProperty()
  @Prop({ required: true })
  teamId: string;

  @ApiProperty()
  @Prop({ required: true })
  name: string;

  @ApiProperty()
  @Prop({ required: true })
  poste: string;

  @ApiProperty()
  @Prop({ required: true })
  birthDate: string;

  @ApiProperty()
  @Prop({ required: true })
  price: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);