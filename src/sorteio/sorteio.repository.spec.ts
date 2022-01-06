import { Test, TestingModule } from '@nestjs/testing';
import { SorteioRepository } from './sorteio.repository';

describe('SorteioRepository', () => {
  let service: SorteioRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SorteioRepository],
    }).compile();

    service = module.get<SorteioRepository>(SorteioRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
