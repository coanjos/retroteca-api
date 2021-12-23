import { Test, TestingModule } from '@nestjs/testing';
import { JogosRepository } from './jogos.repository';

describe('JogosService', () => {
  let service: JogosRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JogosRepository],
    }).compile();

    service = module.get<JogosRepository>(JogosRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
