import { Injectable } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { compareSync } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usuariosService: UsuariosService,
    private readonly jwtService: JwtService,
  ) {}

  async login(usuario) {
    const payload = { sub: usuario._id, email: usuario.email };

    return { token: this.jwtService.sign(payload) };
  }

  async validateUser(email: string, password: string) {
    let usuario;

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
