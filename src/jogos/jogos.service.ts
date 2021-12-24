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
    return this.jogosRepository.findAll()
  }

  findOne(id: string) {
    return this.jogosRepository.findOne(id)
  }

  update(id: string, updateJogoDto: UpdateJogoDto) {
    return this.jogosRepository.patch(id, updateJogoDto)
  }

  remove(id: number) {
    return `This action removes a #${id} jogo`;
  }
}
