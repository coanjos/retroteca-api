import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ComentariosService } from './comentarios.service';
import { CreateComentarioDto } from './dto/create-comentario.dto';

@ApiTags('comentarios')
@Controller('comentarios')
export class ComentariosController {
  constructor(private readonly comentariosService: ComentariosService) {}

  @Post()
  async create(@Body() createComentarioDto: CreateComentarioDto) {
    return await this.comentariosService.create(createComentarioDto);
  }

  @Get()
  async findAll() {
    return await this.comentariosService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.comentariosService.findOne(+id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.comentariosService.remove(+id);
  }
}
