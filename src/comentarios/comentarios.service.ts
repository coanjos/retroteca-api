import { Injectable } from '@nestjs/common';
import { ComentariosRepository } from './comentarios.repository';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@Injectable()
export class ComentariosService {
  constructor(private comentariosRepository: ComentariosRepository) {}

  async create(createComentarioDto: CreateComentarioDto) {
    return await this.comentariosRepository.create(createComentarioDto);
  }

  async findAll() {
    return await this.comentariosRepository.findAll();
  }

  async findOne(id: string) {
    return await this.comentariosRepository.findOne(id);
  }

  async remove(id: string) {
    return await this.comentariosRepository.delete(id);
  }
}
