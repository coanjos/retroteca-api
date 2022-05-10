import { Controller, Get, Post, Patch, Param, Delete } from '@nestjs/common';
import { SorteioService } from './sorteio.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('sorteio')
@Controller('sorteio')
export class SorteioController {
  constructor(private readonly sorteioService: SorteioService) {}

  @Post()
  sortear() {
    return this.sorteioService.sortear();
  }

  @Get()
  findAll() {
    return this.sorteioService.findAll();
  }

  @Get('/historico') 
  getHistorico() {
    return this.sorteioService.getHistorico()
  }
}
