import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JogoDocument = Jogo & Document;

@Schema()
export class Jogo {
  @Prop()
  titulo: string;
  @Prop()
  descricao: string;
  @Prop()
  ano: number;
  @Prop()
  autores: string[];
  @Prop()
  generos: string[];
  @Prop()
  capas: string[];
}

export const JogoSchema = SchemaFactory.createForClass(Jogo);