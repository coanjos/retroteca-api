import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ComentarioDocument = Comentario & Document;

@Schema()
export class Comentario {

  constructor(comentario?: Partial<ComentarioDocument>) {
    this.texto = comentario?.texto;
  }

  @Prop()
  texto: string;
}

export const ComentarioSchema = SchemaFactory.createForClass(Comentario);