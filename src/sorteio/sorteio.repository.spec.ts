import { getModelToken } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Jogo } from 'src/jogos/schemas/jogo.schema';
import { Sorteio } from './schemas/sorteio.schema';
import { SorteioRepository } from './sorteio.repository';

const sorteioDocumentList: Sorteio[] = [
  new Sorteio(),
  new Sorteio(),
  new Sorteio()
]

const newSorteioDocument: Sorteio = {
  sorteadoEm: new Date(),
  ativo: true,
  jogo: new Jogo()
};

class SorteioModel {
  constructor(private data) {}
  save = jest.fn().mockResolvedValue(newSorteioDocument);
  static find = jest.fn().mockResolvedValue(sorteioDocumentList);
  static findOne = jest.fn().mockResolvedValue(newSorteioDocument);
  static findOneAndUpdate = jest.fn().mockResolvedValue(newSorteioDocument);
  static deleteOne = jest.fn().mockResolvedValue(newSorteioDocument);
  static populate = jest.fn().mockResolvedValue(new Jogo());
}

describe('SorteioRepository', () => {
  let sorteioRepository: SorteioRepository;
  let mockSorteioModel: SorteioModel;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteioRepository, {
        provide: getModelToken(Sorteio.name),
        useValue: SorteioModel
      }],
    }).compile();

    mockSorteioModel = module.get<SorteioModel>(getModelToken(Sorteio.name));
    sorteioRepository = module.get<SorteioRepository>(SorteioRepository);
  });

  it('sorteioRepository e mockSorteioModel devem estar definidos', () => {
    expect(sorteioRepository).toBeDefined();
    expect(mockSorteioModel).toBeDefined();
  });
});
