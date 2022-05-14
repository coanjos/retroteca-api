import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { UsuariosRepository } from './usuarios.repository';
import { hashSync } from 'bcrypt';

@Injectable()
export class UsuariosService {
  constructor(private usuariosRepository: UsuariosRepository) {}

  async create(createUsuarioDto: CreateUsuarioDto) {

    createUsuarioDto.senha = hashSync(createUsuarioDto.senha, 10);

    return await this.usuariosRepository.create(createUsuarioDto);
  }

  async findAll() {
    return await this.usuariosRepository.findAll();
  }

  async findByEmail(email: string) {
    return await this.usuariosRepository.findByEmail(email);
  }

  async findOne(id: string) {
    try {
      
      const usuario = await this.usuariosRepository.findOne(id);
  
      return usuario;
      
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado!');
    }
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto) {
    try {      
      return await this.usuariosRepository.patch(id, updateUsuarioDto);
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado!')
    }
  }

  async remove(id: string) {
    try {      
      return await this.usuariosRepository.delete(id);
    } catch (error) {
      throw new NotFoundException('Usuário não encontrado!')
    }
  }

  
}
