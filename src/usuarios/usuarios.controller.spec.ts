import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

describe('UsuariosController', () => {
  let usuariosController: UsuariosController;
  let usuariosService: UsuariosService;  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [{
        provide: UsuariosService,
        useValue: {
          create: jest.fn().mockReturnValue('ui papai')
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

  it('Deve criar um jogo', () => {
    // arrange
    const body: CreateUsuarioDto = {};

    // act
    const result = usuariosController.create(body);

    // assert
    expect(result).toEqual('ui papai');
    expect(usuariosService.create).toHaveBeenCalledTimes(1);
    expect(usuariosService.create).toHaveBeenCalledWith(body);    
  })


});
