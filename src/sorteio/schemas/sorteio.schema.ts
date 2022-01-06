import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Jogo } from 'src/jogos/schemas/jogo.schema';

export type SorteioDocument = Sorteio & Document;

@Schema()
export class Sorteio {
  @Prop()
  sorteadoEm: Date;
  @Prop()
  ativo: boolean;
  @Prop()
  jogo: Jogo;
}

export const SorteioSchema = SchemaFactory.createForClass(Sorteio);