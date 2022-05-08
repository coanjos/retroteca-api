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
    return `This action returns all comentarios`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} comentario`;
  }

  async remove(id: number) {
    return `This action removes a #${id} comentario`;
  }
}
