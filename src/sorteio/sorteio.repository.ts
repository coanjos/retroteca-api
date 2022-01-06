import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSorteioDto } from './dto/create-sorteio.dto';
import { UpdateSorteioDto } from './dto/update-sorteio.dto';
import { Sorteio, SorteioDocument } from './schemas/sorteio.schema';

@Injectable()
export class SorteioRepository {
  constructor(@InjectModel(Sorteio.name) private sorteioModel: Model<SorteioDocument>) {}

  create(createSorteioDto: CreateSorteioDto) {
    return 'This action adds a new sorteio';
  }

  findAll() {
    return `This action returns all sorteio`;
  }

  findOne(id: string) {
    return id;
  }

  update(id: string, updateSorteioDto: UpdateSorteioDto) {
    return id;
  }

  remove(id: string) {
    return id;
  }
}
