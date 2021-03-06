import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './schemas/usuario.schema';
import { UsuariosController } from './usuarios.controller';
import { UsuariosService } from './usuarios.service';

const newUsuarioDocument = new Usuario({
  nome: 'adm',
  email: 'email@teste.com',
  senha: 'quixeramobim'
});

const usuarioDocumentList: Usuario[] = [
  newUsuarioDocument,
  newUsuarioDocument
]

describe('UsuariosController', () => {
  let usuariosController: UsuariosController;
  let usuariosService: UsuariosService;  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsuariosController],
      providers: [{
        provide: UsuariosService,
        useValue: {
          create: jest.fn().mockResolvedValueOnce(newUsuarioDocument),
          findAll: jest.fn().mockResolvedValueOnce(usuarioDocumentList),
          findOne: jest.fn().mockResolvedValueOnce(newUsuarioDocument),
          update: jest.fn().mockResolvedValueOnce(newUsuarioDocument),
          remove: jest.fn().mockResolvedValueOnce(newUsuarioDocument)
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
  });

  it('Deve trazer uma lista de usu??rios', async () => {
    const result = await usuariosController.findAll();

    expect(result).toBe(usuarioDocumentList);
  });

  it('Deve trazer um usu??rio por id', async () => {
    const id = 'abcdefghij';

    const result = await usuariosController.findOne(id);

    expect(result).toMatchObject(newUsuarioDocument);
    expect(usuariosService.findOne).toBeCalledWith(id);
  });

  it('Deve lan??ar uma exce????o ao procurar usu??rio n??o existente', async () => {
    const id = 'idInvalido';

    jest.spyOn(usuariosService, 'findOne').mockRejectedValueOnce(new NotFoundException());

    const result = await usuariosController.findOne(id);

    expect(usuariosService.findOne).rejects.toThrowError();
  });

  it('Deve atualizar um usu??rio', async () => {
    const id = 'abcdefghij';

    const body: UpdateUsuarioDto = { 
      nome: 'adm',
      email: 'email@teste.com',
      senha: 'quixeramobim'
    };

    const result = await usuariosController.update(id, body);

    expect(result).toMatchObject(newUsuarioDocument);
    expect(usuariosService.update).toBeCalledWith(id, body);
  });

  it('Deve lan??ar uma exce????o ao atualizar usu??rio n??o existente', async () => {
    const id = 'idInvalido';

    const body: UpdateUsuarioDto = { 
      nome: 'adm',
      email: 'email@teste.com',
      senha: 'quixeramobim'
    };

    jest.spyOn(usuariosService, 'update').mockRejectedValueOnce(new NotFoundException());

    const result = await usuariosController.update(id, body);

    expect(usuariosService.update).rejects.toThrowError();
  });

  it('Deve deletar um usu??rio', async () => {
    const id = 'abcdefghij';

    const result = await usuariosController.remove(id);

    expect(result).toMatchObject(newUsuarioDocument);
    expect(usuariosService.remove).toBeCalledWith(id);
  });

  it('Deve lan??ar uma exce????o ao deletar usu??rio n??o existente', async () => {
    const id = 'idInvalido';

    jest.spyOn(usuariosService, 'remove').mockRejectedValueOnce(new NotFoundException());

    const result = await usuariosController.remove(id);

    expect(usuariosService.remove).rejects.toThrowError();
  });
});
