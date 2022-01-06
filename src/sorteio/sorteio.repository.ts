import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSorteioDto } from './dto/create-sorteio.dto';
import { UpdateSorteioDto } from './dto/update-sorteio.dto';
import { Sorteio, SorteioDocument } from './schemas/sorteio.schema';

@Injectable()
export class SorteioRepository {
  constructor(@InjectModel(Sorteio.name) private sorteioModel: Model<SorteioDocument>) {}

  async sortear(createSorteioDto: CreateSorteioDto) {
    const sorteioCriado = new this.sorteioModel(createSorteioDto);

      return await sorteioCriado.save();
  }

  async findAll() {
    const sorteios = await this.sorteioModel.find().populate('jogo');

    return sorteios;
  }

  async patch(id: string, updateSorteioDto: UpdateSorteioDto) {
    const sorteioExiste = await this.sorteioModel.findOne({ _id: id });

    if (!sorteioExiste) {
        throw new NotFoundException('Não encontrado');
    }

    return await this.sorteioModel.findOneAndUpdate({ _id: id }, updateSorteioDto);
  }
}
