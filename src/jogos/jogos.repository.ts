import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jogo, JogoDocument } from './schemas/jogo.schema';
import { CreateJogoDto } from './dto/create-jogo.dto';

@Injectable()
export class JogosRepository {
    constructor(@InjectModel(Jogo.name) private jogoModel: Model<JogoDocument>) {}

    async create (createJogoDto: CreateJogoDto) {
        const jogoCriado = new this.jogoModel(createJogoDto);

        return await jogoCriado.save();
    }

    async findAll() {
        const jogos = await this.jogoModel.find();

        return jogos;
    }

    async findOne(id: string) {
        const jogo = await this.jogoModel.findById(id);

        return jogo;
    }
}