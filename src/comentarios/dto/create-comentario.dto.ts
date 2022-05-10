import { ApiProperty } from "@nestjs/swagger";
import { Jogo } from "src/jogos/schemas/jogo.schema";

export class CreateComentarioDto {
    @ApiProperty()
    texto: string;
    @ApiProperty()
    jogo: string;
}
