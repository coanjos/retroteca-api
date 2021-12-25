import { Model } from 'mongoose';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Jogo, JogoDocument } from './schemas/jogo.schema';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';

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
        const jogo = await this.jogoModel.findOne({ _id: id });

        if (!jogo) {
            throw new NotFoundException('Não encontrado.');
        }

        return jogo;
    }

    async patch(id: string, updateJogoDto: UpdateJogoDto) {
        const jogoExiste = await this.jogoModel.findOne({ _id: id });

        if (!jogoExiste) {
            throw new NotFoundException('Não encontrado');
        }

        return await this.jogoModel.findOneAndUpdate({ _id: id }, updateJogoDto);
    }

    async delete(id: string) {
        const jogoExiste = await this.jogoModel.findOne({ _id: id });

        if(!jogoExiste) {
            throw new NotFoundException('Não encontrado');
        }

        return await this.jogoModel.deleteOne({ _id: id })
    }
}