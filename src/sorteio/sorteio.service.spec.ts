import { Test, TestingModule } from '@nestjs/testing';
import { SorteioService } from './sorteio.service';

describe('SorteioService', () => {
  let service: SorteioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteioService],
    }).compile();

    service = module.get<SorteioService>(SorteioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
