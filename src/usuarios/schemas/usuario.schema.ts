import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UsuarioDocument = Usuario & Document;

@Schema()
export class Usuario {

constructor(usuario?: Partial<UsuarioDocument>) {
    this.nome = usuario?.nome;
    this.email = usuario?.email;
    this.senha = usuario?.senha;
  }

  @Prop()
  nome: string;
  @Prop()
  email: string;
  @Prop()
  senha: string;
}

export const UsuarioSchema = SchemaFactory.createForClass(Usuario);