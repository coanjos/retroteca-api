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
  create(@Body() createSorteioDto: CreateSorteioDto) {
    return this.sorteioService.create(createSorteioDto);
  }

  @Get()
  findAll() {
    return this.sorteioService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sorteioService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSorteioDto: UpdateSorteioDto) {
    return this.sorteioService.update(id, updateSorteioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sorteioService.remove(id);
  }
}
