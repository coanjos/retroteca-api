import { Test, TestingModule } from '@nestjs/testing';
import { SorteioController } from './sorteio.controller';
import { SorteioService } from './sorteio.service';

describe('SorteioController', () => {
  let controller: SorteioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SorteioController],
      providers: [SorteioService],
    }).compile();

    controller = module.get<SorteioController>(SorteioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
