import { Controller, Get, Post, Body, Patch, Param, Delete,
   UseInterceptors, UploadedFile, Res, BadRequestException } from '@nestjs/common';
import { JogosService } from './jogos.service';
import { CreateJogoDto } from './dto/create-jogo.dto';
import { UpdateJogoDto } from './dto/update-jogo.dto';
import { ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { editFileName, imageFileFilter } from '../utils/file-uploading.utils';
import { diskStorage } from 'multer';

@ApiTags('jogos')
@Controller('jogos')
export class JogosController {
  constructor(private readonly jogosService: JogosService) {}

  @Post()
  create(@Body() createJogoDto: CreateJogoDto) {
    return this.jogosService.create(createJogoDto);
  }

  @Post('capas')
  @UseInterceptors(
    FileInterceptor('capa', {
      storage: diskStorage({
        destination: './files',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  async uploadCapa(@UploadedFile() capa) {
    if (capa != null) {
      const response = {
        filename: capa.filename
      }

      return response
    }
    
    throw new BadRequestException();
  }

  @Get()
  findAll() {
    return this.jogosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.jogosService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateJogoDto: UpdateJogoDto) {
    return this.jogosService.update(id, updateJogoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.jogosService.remove(id);
  }

  @Get('capas/:imgpath')
  seeUploadedFile(@Param('imgpath') image, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }  
}
