import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JogoDocument = Jogo & Document;

@Schema()
export class Jogo {
  @Prop()
  titulo: string;
}

export const JogoSchema = SchemaFactory.createForClass(Jogo);