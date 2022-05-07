import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { Usuario } from './schemas/usuario.schema';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

const newUsuarioDocument = new Usuario({
  nome: 'adm',
  email: 'email@teste.com',
  senha: 'quixeramobim'
});

describe('UsuariosController', () => {
  let usuariosController: UsuariosController;
  let usuariosService: UsuariosService;  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [{
        provide: UsuariosService,
        useValue: {
          create: jest.fn().mockResolvedValueOnce(newUsuarioDocument)          
        }
      }],
    }).compile();

    usuariosController = module.get<UsuariosController>(UsuariosController);
    usuariosService = module.get<UsuariosService>(UsuariosService);
  });

  it('Controller e service devem estar definidas', () => {
    expect(usuariosController).toBeDefined();
    expect(usuariosService).toBeDefined();
  });

  it('Deve criar um jogo', async () => {
    // arrange
    const body: CreateUsuarioDto = { 
      nome: 'adm',
      email: 'email@teste.com',
      senha: 'quixeramobim'
    };

    // act
    const result = await usuariosController.create(body);

    // assert
    expect(result).toMatchObject(body);
    expect(usuariosService.create).toHaveBeenCalledWith(body);    
  })


});
