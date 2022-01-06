import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SorteioService } from './sorteio.service';
import { CreateSorteioDto } from './dto/create-sorteio.dto';
import { UpdateSorteioDto } from './dto/update-sorteio.dto';
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

}
