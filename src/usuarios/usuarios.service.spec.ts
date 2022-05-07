import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './schemas/usuario.schema';
import { UsuariosRepository } from './usuarios.repository';
import { UsuariosService } from './usuarios.service';

const newUsuarioDocument = new Usuario({
  nome: 'adm',
  email: 'email@teste.com',
  senha: 'quixeramobim'
});

describe('UsuariosService', () => {
  let usuariosService: UsuariosService;
  let usuariosRepository: UsuariosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsuariosService, {
        provide: UsuariosRepository,
        useValue: {
          create: jest.fn().mockResolvedValueOnce(newUsuarioDocument)
        }
      }],
    }).compile();

    usuariosService = module.get<UsuariosService>(UsuariosService);
    usuariosRepository = module.get<UsuariosRepository>(UsuariosRepository);
  });

  it('Service e repository devem estar definidas', () => {
    expect(usuariosService).toBeDefined();
    expect(usuariosRepository).toBeDefined();
  });

  it('Deve criar um usuário', async () => {
    const body: CreateUsuarioDto = {
      nome: 'adm',
      email: 'email@teste.com',
      senha: 'quixeramobim'
    }

    const result = await usuariosService.create(body);

    expect(result).toMatchObject(body);
    expect(usuariosRepository.create).toBeCalledWith(body);
  })
});
