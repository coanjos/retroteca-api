import { Injectable } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosRepository } from './usuarios.repository';

@Injectable()
export class UsuariosService {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async create(createUsuarioDto: CreateUsuarioDto) {
    return await this.usuariosRepository.create(createUsuarioDto)
  }

  async findAll() {
    return await this.usuariosRepository.findAll();
  }

  async findOne(id: string) {
    return await this.usuariosRepository.findOne(id);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    return await this.usuariosRepository.patch(id, updateUsuarioDto);
  }

  async remove(id: string) {
    return await this.usuariosRepository.delete(id);
  }
}
