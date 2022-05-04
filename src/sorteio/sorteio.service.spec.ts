import { Test, TestingModule } from '@nestjs/testing';
import { JogosRepository } from 'src/jogos/jogos.repository';
import { Jogo } from 'src/jogos/schemas/jogo.schema';
import { Sorteio, SorteioDocument } from './schemas/sorteio.schema';
import { SorteioRepository } from './sorteio.repository';
import { SorteioService } from './sorteio.service';

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
    capa: 'ABC.jpg',
    descricao: 'Mario goes puin',
    foiSorteado: true,
    plataformas: ['nes']
});

describe('SorteioService', () => {
  let sorteioService: SorteioService;
  let sorteioRepository: SorteioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteioService, {
        provide: SorteioRepository,
        useValue: {
          findAll: jest.fn().mockResolvedValue(sorteioDocumentList),
          sortear: jest.fn().mockResolvedValue(newSorteioDocument)         
        }
      }, {
        provide: JogosRepository,
        useValue: {
          findAll: jest.fn().mockResolvedValue(jogoDocumentList),
          patch: jest.fn().mockResolvedValue(newJogoDocument)
        }
      }],
    }).compile();

    sorteioService = module.get<SorteioService>(SorteioService);
    sorteioRepository = module.get<SorteioRepository>(SorteioRepository);
  });

  it('service e repository devem estar definidas', () => {
    expect(sorteioService).toBeDefined();
    expect(sorteioRepository).toBeDefined();
  });

  it('deve buscar historico de sorteios', async () => {
    const result = await sorteioService.findAll();

    expect(result).toEqual(sorteioDocumentList);
    expect(sorteioRepository.findAll).toHaveBeenCalledTimes(1);
  })

  it('deve criar um sorteio', async () => {
    const result = await sorteioService.sortear();

    expect(result).toEqual(newSorteioDocument);
    expect(sorteioRepository.sortear).toHaveBeenCalledTimes(1);    
  });

});
