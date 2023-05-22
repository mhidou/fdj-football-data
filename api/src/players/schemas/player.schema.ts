import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema()
export class Player {
  @Prop({ required: true })
  teamId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  poste: string;

  @Prop({ required: true })
  birthDate: string;

  @Prop({ required: true })
  price: string;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);