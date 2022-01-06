import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Jogo } from 'src/jogos/schemas/jogo.schema';
import { Document } from 'mongoose';

export type SorteioDocument = Sorteio & Document;

@Schema()
export class Sorteio {
  @Prop()
  sorteadoEm: Date;
  @Prop()
  ativo: boolean;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Jogo' })
  jogo: Jogo;
}

export const SorteioSchema = SchemaFactory.createForClass(Sorteio);