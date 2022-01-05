import { Injectable } from '@nestjs/common';
import { CreateSorteioDto } from './dto/create-sorteio.dto';
import { UpdateSorteioDto } from './dto/update-sorteio.dto';

@Injectable()
export class SorteioService {
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
