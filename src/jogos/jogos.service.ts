import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { JogosRepository } from './jogos.repository';
import { unlink } from 'fs';

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

  async update(id: string, updateJogoDto: UpdateJogoDto) {
    const jogoExiste = await this.jogosRepository.findOne(id);

    if (!jogoExiste) {
      throw new NotFoundException('Não encontrado');
    }

    if(updateJogoDto.capa !== jogoExiste.capa) {
      await this.deletarCapa(jogoExiste.capa);
    }  

    return this.jogosRepository.patch(id, updateJogoDto)
  }

  async remove(id: string) {
    const jogoExiste = await this.jogosRepository.findOne(id);

    if(!jogoExiste) {
      throw new NotFoundException('Não encontrado');
    }

    await this.deletarCapa(jogoExiste.capa);

    return this.jogosRepository.delete(id);
  }

  async deletarCapa(image: string) {
    let prefix = './files/';

    let imgPath = prefix + image;

    await unlink(imgPath, (err) => {
      if (err) {
        throw new Error(err.message)
      }
    });
  }
}
