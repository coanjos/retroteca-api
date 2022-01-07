import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JogosRepository } from './jogos.repository';
import { Jogo, JogoDocument } from './schemas/jogo.schema';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { NotFoundException } from '@nestjs/common';

const jogoDocumentList: Jogo[] = [
  new Jogo({ titulo: 'a' }),
  new Jogo({ titulo: 'b' }),
  new Jogo({ titulo: 'c' })
];

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

class JogoModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(newJogoDocument);
  static find = jest.fn().mockResolvedValue(jogoDocumentList);
  static findOne = jest.fn().mockResolvedValue(newJogoDocument);
  static findOneAndUpdate = jest.fn().mockResolvedValue(newJogoDocument);
  static deleteOne = jest.fn().mockResolvedValue(newJogoDocument);
}

describe('JogosService', () => {
  let jogosRepository: JogosRepository;
  let mockJogoModel: JogoModel

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JogosRepository, {
        provide: getModelToken(Jogo.name),
        useValue: JogoModel
      }],
    }).compile();

    mockJogoModel = module.get<JogoModel>(getModelToken(Jogo.name));
    jogosRepository = module.get<JogosRepository>(JogosRepository);
  });

  it('jogosRepository e mockJogoModel devem estar definidos', () => {
    expect(jogosRepository).toBeDefined();
    expect(mockJogoModel).toBeDefined();
  });

  it('deve trazer uma lista de jogos', async () => {
    const result = await jogosRepository.findAll();
    
    expect(result).toBe(jogoDocumentList);
    expect(JogoModel.find).toBeCalledTimes(1);    
  });

  it('deve buscar um jogo por id', async () => {
    const id = '1';

    const result = await jogosRepository.findOne(id);

    expect(result).toBe(newJogoDocument);
    expect(JogoModel.findOne).toBeCalled();
  });

  it('deve criar um jogo novo', async () => {
    const body: CreateJogoDto = {
      titulo: 'Supaa Mario Burasu',
      ano: 1985,
      autores: ['Shigeru Miyamoto'],
      generos: ['Plataforma'],
      capas: ['ABC'],
      descricao: 'Mario goes puin',
      foiSorteado: true
    };

    const result = await jogosRepository.create(body);

    expect(result).toEqual(newJogoDocument);
    expect(JogoModel).toBeCalled;
  });

  it('deve atualizar um jogo', async () => {
    const id = '1';

    const body: CreateJogoDto = {
      titulo: 'Supaa Mario Burasu',
      ano: 1985,
      autores: ['Shigeru Miyamoto'],
      generos: ['Plataforma'],
      capas: ['ABC'],
      descricao: 'Mario goes puin',
      foiSorteado: true
    };

    const result = await jogosRepository.patch(id, body);

    expect(result).toBe(newJogoDocument);
    expect(JogoModel.findOneAndUpdate).toBeCalled();
  });

  it('deve deletar um jogo', async () => {
    const id = '1';

    const result = await jogosRepository.delete(id);

    expect(result).toBe(newJogoDocument);
    expect(JogoModel.deleteOne).toBeCalled();
  });

  it('deve retornar nulo quando buscar por id e lançar exceção', async () => {
    jest.spyOn(JogoModel, 'findOne').mockResolvedValue(null);

    await expect(jogosRepository.findOne('1'))
      .rejects.toThrowError(NotFoundException);
  });

  it('deve retornar nulo quando atualizar por id e lançar exceção', async () => {
    jest.spyOn(JogoModel, 'findOne').mockResolvedValue(null);

    await expect(jogosRepository.patch('1', { titulo: 'yoga fire' }))
      .rejects.toThrowError(NotFoundException);
  });

  it('deve retornar nulo quando atualizar por id e lançar exceção', async () => {
    jest.spyOn(JogoModel, 'findOne').mockResolvedValue(null);

    await expect(jogosRepository.delete('1'))
      .rejects.toThrowError(NotFoundException);
  });

});
