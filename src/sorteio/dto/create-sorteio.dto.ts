import { ApiProperty } from "@nestjs/swagger";
import { CreateJogoDto } from "src/jogos/dto/create-jogo.dto";

export class CreateSorteioDto {
    @ApiProperty()
    sorteadoEm: Date;
    @ApiProperty()
    ativo: boolean;
    @ApiProperty()
    jogo: CreateJogoDto;
}
