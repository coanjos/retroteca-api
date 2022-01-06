import { Injectable } from '@nestjs/common';
import { JogosRepository } from 'src/jogos/jogos.repository';
import { JogoDocument } from 'src/jogos/schemas/jogo.schema';
import { CreateSorteioDto } from './dto/create-sorteio.dto';
import { UpdateSorteioDto } from './dto/update-sorteio.dto';
import { Sorteio, SorteioDocument } from './schemas/sorteio.schema';
import { SorteioRepository } from './sorteio.repository';

@Injectable()
export class SorteioService {
  constructor(
    private readonly sorteioRepository: SorteioRepository,
    private readonly jogosRepository: JogosRepository
  ) {}

  async sortear() {
    const sorteadoAtivo = await this.verificaSorteioAtivo();

    if (!sorteadoAtivo) {

      return await this.criarSorteio(); 

    } else if (this.passouUmaSemana(sorteadoAtivo)) {

      await this.desabilitarSorteioAtual(sorteadoAtivo);
      return await this.criarSorteio();
    } 

    return sorteadoAtivo;

  }

  findAll() {
    return this.sorteioRepository.findAll();
  }

  passouUmaSemana(sorteadoAtivo: SorteioDocument): boolean {
    const dataAntes = sorteadoAtivo.sorteadoEm;
    const agora = new Date();    

    let timeInMilisec: number = agora.getTime() - dataAntes.getTime();

    let daysBetweenDates: number = Math.floor(timeInMilisec / (1000 * 60 * 60 * 24));

    return daysBetweenDates >= 3;   
  }

  async verificaSorteioAtivo(): Promise<SorteioDocument> {
    const sorteios = await this.sorteioRepository.findAll();

    const sorteadoAtivo = sorteios.filter(x => x.ativo)[0];

    return sorteadoAtivo;
  }

  async criarSorteio(): Promise<SorteioDocument> {
    const sorteio = new CreateSorteioDto();

    sorteio.ativo = true;
    sorteio.sorteadoEm = new Date();

    sorteio.jogo = await this.buscaJogoNaoSorteado();

    return await this.sorteioRepository.sortear(sorteio);   
  }

  async buscaJogoNaoSorteado(): Promise<JogoDocument> {
    const jogos = await this.jogosRepository.findAll();

    const naoSorteados = jogos.filter(x => !x.foiSorteado);

    const jogoAleatorioIndex = Math.floor(Math.random() * naoSorteados.length);
    
    await this.jogosRepository.patch(naoSorteados[jogoAleatorioIndex]._id, { foiSorteado: true });

    return naoSorteados[jogoAleatorioIndex];
  }

  async desabilitarSorteioAtual(sorteadoAtivo: SorteioDocument) {
      const sorteioAtual = new UpdateSorteioDto()

      sorteioAtual.ativo = false;

      await this.sorteioRepository.patch(sorteadoAtivo._id, sorteioAtual)
  }
}
