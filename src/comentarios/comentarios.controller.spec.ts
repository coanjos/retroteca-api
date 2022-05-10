import { Test, TestingModule } from '@nestjs/testing';
import { ComentariosController } from './comentarios.controller';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

const newComentarioDocument = {}

describe('ComentariosController', () => {
  let comentariosController: ComentariosController;
  let comentariosService: ComentariosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ComentariosController],
      providers: [{
        provide: ComentariosService,
        useValue: {
          create: jest.fn().mockResolvedValueOnce(newComentarioDocument)
        }
      }],
    }).compile();

    comentariosController = module.get<ComentariosController>(ComentariosController);
    comentariosService = module.get<ComentariosService>(ComentariosService);
  });

  it('Controller e service devem estar definidas', () => {
    expect(comentariosController).toBeDefined();
    expect(comentariosService).toBeDefined();
  });

  it('Deve criar um comentário', async () => {
    const body: CreateComentarioDto = {
      texto: 'meu uq falar desse jogo'
    };

    const result = await comentariosController.create(body);

    expect(result).toMatchObject(newComentarioDocument);
    expect(comentariosService.create).toBeCalled();
  })
});
