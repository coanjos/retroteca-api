import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { JogosRepository } from './jogos.repository';
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

describe('JogosService', () => {
  let jogosService: JogosService;
  let jogosRepository: JogosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JogosService, {
        provide: JogosRepository,
        useValue: {
          create: jest.fn().mockResolvedValue(newJogoDocument),
          findAll: jest.fn().mockResolvedValue(jogoDocumentList),
          findOne: jest.fn().mockResolvedValue(jogoDocumentList[0]),
          patch: jest.fn().mockResolvedValue(jogoDocumentList[0]),
          delete: jest.fn().mockResolvedValue(jogoDocumentList[0])
        }
      }],
    }).compile();

    jogosService = module.get<JogosService>(JogosService);
    jogosRepository = module.get<JogosRepository>(JogosRepository);
  });

  it('service e repository devem estar definidas', () => {
    expect(jogosService).toBeDefined();
    expect(jogosRepository).toBeDefined();
  });

  it('deve buscar todos os jogos', async () => {
    const result = await jogosService.findAll();

    expect(result).toEqual(jogoDocumentList);
    expect(jogosRepository.findAll).toHaveBeenCalledTimes(1);
  })

  it('deve lançar exceção ao buscar lista', () => {
    jest.spyOn(jogosRepository, 'findAll').mockRejectedValueOnce(new NotFoundException());

    expect(jogosRepository.findAll).rejects.toThrowError();
  })

  it('deve buscar um jogo', async () => {
    const id = '1';

    const result = await jogosService.findOne(id);

    expect(result).toEqual(jogoDocumentList[0]);
  })

  it('deve criar um jogo', async () => {
    const body: CreateJogoDto = {
      titulo: 'Supaa Mario Burasu',
      ano: 1985,
      autores: ['Shigeru Miyamoto'],
      generos: ['Plataforma'],
      capas: ['ABC'],
      descricao: 'Mario goes puin',
      foiSorteado: true
    };

    const result = await jogosService.create(body);

    expect(result).toEqual(newJogoDocument);
    expect(jogosRepository.create).toHaveBeenCalledTimes(1);
    expect(jogosRepository.create).toHaveBeenCalledWith(body);
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

    const result = await jogosService.update(id, updateBody);

    expect(result).toEqual(jogoDocumentList[0]);
    expect(jogosRepository.patch).toHaveBeenCalledTimes(1);
    expect(jogosRepository.patch).toHaveBeenCalledWith(id, updateBody);
  });

  it('deve remover um jogo', async () => {
    const id = '1'

    const result = await jogosService.remove(id);

    expect(result).toEqual(jogoDocumentList[0]);
    expect(jogosRepository.delete).toHaveBeenCalledTimes(1);
    expect(jogosRepository.delete).toHaveBeenCalledWith(id);
  });

  it('deve lançar exceção ao deletar um jogo', () => {
    jest.spyOn(jogosRepository, 'delete').mockRejectedValueOnce(new Error());

    expect(jogosRepository.delete).rejects.toThrowError();
  })
});
