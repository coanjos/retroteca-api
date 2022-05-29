import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Usuario } from 'src/usuarios/schemas/usuario.schema';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(credenciais) {
    const payload = { sub: credenciais._id, email: credenciais.email };

    const usuario = await this.validateUser(credenciais.email, credenciais.senha);

    return { token: this.jwtService.sign(payload), usuario: { nome: usuario.nome, email: usuario.email } };
  }

  async validateUser(email: string, password: string) {
    let usuario: Usuario;

    try {
      usuario = await this.usuariosService.findByEmail(email);
    } catch (error) {
      return null;
    }

    const isPasswordValid = compareSync(password, usuario.senha);

    if (!isPasswordValid) return null;    

    return usuario;
  }
}
