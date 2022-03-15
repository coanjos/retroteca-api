import { Test, TestingModule } from '@nestjs/testing';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { JogosController } from './jogos.controller';
import { JogosService } from './jogos.service';
import { Jogo } from './schemas/jogo.schema';

const jogoDocumentList: Jogo[] = [
  new Jogo({ titulo: 'a' }),
  new Jogo({ titulo: 'b' }),
  new Jogo({ titulo: 'c' })
]

const newJogoDocument = new Jogo(
  {
    titulo: 'Supaa Mario Burasu',
    ano: 1985,
    autores: ['Shigeru Miyamoto'],
    generos: ['Plataforma'],
    capas: ['ABC'],
    descricao: 'Mario goes puin',
    foiSorteado: true
  });

describe('JogosController', () => {
  let jogosController: JogosController;
  let jogosService: JogosService;  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JogosController],
      providers: [{
        provide: JogosService,
        useValue: {
          create: jest.fn().mockResolvedValue(newJogoDocument),
          findAll: jest.fn().mockResolvedValue(jogoDocumentList),
          findOne: jest.fn().mockResolvedValue(jogoDocumentList[0]),
          update: jest.fn().mockResolvedValue(jogoDocumentList[0]),
          remove: jest.fn().mockResolvedValue(jogoDocumentList[0])
        }
      }],
    }).compile();

    jogosController = module.get<JogosController>(JogosController);
    jogosService = module.get<JogosService>(JogosService);
  });

  it('controller e service devem estar definidas', () => {
    expect(jogosController).toBeDefined();
    expect(jogosService).toBeDefined();
  });

  it('deve retornar uma lista de jogos', async () => {
    const result = await jogosController.findAll();

    expect(result).toBe(jogoDocumentList);
    expect(jogosService.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve lançar exceção ao buscar lista', () => {
    jest.spyOn(jogosService, 'findAll').mockRejectedValueOnce(new Error());

    expect(jogosService.findAll).rejects.toThrowError();
  });

  it('deve criar um jogo', async () => {
    const body: CreateJogoDto = {
      titulo: 'Supaa Mario Burasu',
      ano: 1985,
      autores: ['Shigeru Miyamoto'],
      generos: ['Plataforma'],
      capas: ['ABC'],
      descricao: 'Mario goes puin',
      foiSorteado: true,
      plataformas: ['nes']
    };

    const result = await jogosController.create(body);

    expect(result).toEqual(newJogoDocument);
    expect(jogosService.create).toHaveBeenCalledTimes(1);
    expect(jogosService.create).toHaveBeenCalledWith(body);
  });

  it('deve trazer um jogo', async () => {
    const id = '1';

    const result = await jogosController.findOne(id);

    expect(result).toEqual(jogoDocumentList[0]);
    expect(jogosService.findOne).toHaveBeenCalledTimes(1);
    expect(jogosService.findOne).toHaveBeenCalledWith(id);
  });

  it('deve atualizar um jogo', async () => { 
    const id = '1';

    const updateBody: UpdateJogoDto = {
      titulo: 'Supaa Mario Burasu',
      ano: 1985,
      autores: ['Shigeru Miyamoto'],
      generos: ['Plataforma'],
      capas: ['ABC'],
      descricao: 'Mario goes puin',
      foiSorteado: true
    }

    const result = await jogosController.update(id, updateBody);

    expect(result).toEqual(jogoDocumentList[0]);
    expect(jogosService.update).toHaveBeenCalledTimes(1);
    expect(jogosService.update).toHaveBeenCalledWith(id, updateBody);
  });

  it('deve remover um jogo', async () => {
    const id = '1'

    const result = await jogosController.remove(id);

    expect(result).toEqual(jogoDocumentList[0]);
    expect(jogosService.remove).toHaveBeenCalledTimes(1);
    expect(jogosService.remove).toHaveBeenCalledWith(id);
  });
});
