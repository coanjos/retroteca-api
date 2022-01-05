import { PartialType } from '@nestjs/swagger';
import { CreateSorteioDto } from './create-sorteio.dto';

export class UpdateSorteioDto extends PartialType(CreateSorteioDto) {}
