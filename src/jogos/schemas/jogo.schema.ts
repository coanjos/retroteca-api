import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type JogoDocument = Jogo & Document;

@Schema()
export class Jogo {

  constructor(jogo?: Partial<JogoDocument>) {
    this.titulo = jogo?._id;
    this.descricao = jogo?.descricao;
    this.ano = jogo?.ano;
    this.autores = jogo?.autores;
    this.capas = jogo?.capas;
    this.generos = jogo?.generos;
    this.foiSorteado = jogo?.foiSorteado;
    this.plataformas = jogo?.plataformas;
  }

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
  @Prop()
  foiSorteado: boolean;
  @Prop()
  plataformas: string[];
}

export const JogoSchema = SchemaFactory.createForClass(Jogo);