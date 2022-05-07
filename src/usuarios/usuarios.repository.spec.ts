import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UsuariosRepository } from './usuarios.repository';
import { Usuario, UsuarioDocument } from './schemas/usuario.schema';
import { CreateUsuarioDto } from './dto/create-usuario.dto';

const newUsuarioDocument = new Usuario({
    nome: 'adm',
    email: 'email@teste.com',
    senha: 'quixeramobim'
});

class UsuarioModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(newUsuarioDocument);
}

describe('UsuariosRepository', () => {
  let usuariosRepository: UsuariosRepository;
  let mockUsuarioModel: UsuarioModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosRepository, {
        provide: getModelToken(Usuario.name),
        useValue: UsuarioModel
      }],
    }).compile();

    mockUsuarioModel = module.get<UsuarioModel>(getModelToken(Usuario.name));
    usuariosRepository = module.get<UsuariosRepository>(UsuariosRepository);
  });

  it('usuariosRepository e mockUsuarioModel devem estar definidos', () => {
    expect(usuariosRepository).toBeDefined();
    expect(mockUsuarioModel).toBeDefined();
  });

  it('deve criar um usuário novo', async () => {
    const body: CreateUsuarioDto = {
      nome: 'adm',
      email: 'email@teste.com',
      senha: 'quixeramobim'
    };

    const result = await usuariosRepository.create(body);

    expect(result).toEqual(newUsuarioDocument);
    expect(UsuarioModel).toBeCalled;
  });
});
