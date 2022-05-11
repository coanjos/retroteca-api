import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Jogo } from 'src/jogos/schemas/jogo.schema';
import * as mongoose from 'mongoose';

export type ComentarioDocument = Comentario & Document;

@Schema()
export class Comentario {

  constructor(comentario?: Partial<ComentarioDocument>) {
    this.texto = comentario?.texto;
    this.jogo = comentario?.jogo;
  }

  @Prop()
  texto: string;
  @Prop()
  jogo: string;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);