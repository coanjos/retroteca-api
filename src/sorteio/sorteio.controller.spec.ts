import { Test, TestingModule } from '@nestjs/testing';
import { Jogo } from 'src/jogos/schemas/jogo.schema';
import { Sorteio } from './schemas/sorteio.schema';
import { SorteioController } from './sorteio.controller';
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

describe('SorteioController', () => {
  let sorteioController: SorteioController;
  let sorteioService: SorteioService;  

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SorteioController],
      providers: [{
        provide: SorteioService,
        useValue: {          
          findAll: jest.fn().mockResolvedValue(sorteioDocumentList),
          sortear: jest.fn().mockResolvedValue(newSorteioDocument),
          getHistorico: jest.fn().mockResolvedValue(sorteioDocumentList)          
        }
    }],
  }).compile();

    sorteioController = module.get<SorteioController>(SorteioController);
    sorteioService = module.get<SorteioService>(SorteioService);
  });

  it('controller e service devem estar definidas', () => {
    expect(sorteioController).toBeDefined();
    expect(sorteioService).toBeDefined();
  });

  it('deve retornar uma lista de sorteios', async () => {
    const result = await sorteioController.findAll();

    expect(result).toBe(sorteioDocumentList);
    expect(sorteioService.findAll).toHaveBeenCalledTimes(1);
  });

  it('deve lançar exceção ao buscar lista', () => {
    jest.spyOn(sorteioService, 'findAll').mockRejectedValueOnce(new Error());

    expect(sorteioService.findAll).rejects.toThrowError();
  });

  it('deve criar um sorteio', async () => {

    const result = await sorteioController.sortear();

    expect(result).toEqual(newSorteioDocument);
    expect(sorteioService.sortear).toHaveBeenCalledTimes(1);
  });

  it('deve retornar uma lista de historico de sorteios', async () => {
    const result = await sorteioController.getHistorico();

    expect(result).toBe(sorteioDocumentList);
    expect(sorteioService.getHistorico).toHaveBeenCalledTimes(1);
  });

});
