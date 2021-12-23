import { Injectable } from '@nestjs/common';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { JogosRepository } from './jogos.repository';

@Injectable()
export class JogosService {
  constructor(private jogosRepository: JogosRepository) {}

  create(createJogoDto: CreateJogoDto) {
    return this.jogosRepository.create(createJogoDto);
  }

  findAll() {
    return `This action returns all jogos`;
  }

  findOne(id: number) {
    return `This action returns a #${id} jogo`;
  }

  update(id: number, updateJogoDto: UpdateJogoDto) {
    return `This action updates a #${id} jogo`;
  }

  remove(id: number) {
    return `This action removes a #${id} jogo`;
  }
}
