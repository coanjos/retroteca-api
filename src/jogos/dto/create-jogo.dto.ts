import { ApiProperty } from "@nestjs/swagger";

export class CreateJogoDto {
    @ApiProperty()
    titulo: string;
    @ApiProperty()
    descricao: string;
    @ApiProperty()
    ano: number;
    @ApiProperty()
    autores: string[];
    @ApiProperty()
    generos: string[];
    @ApiProperty()
    capas: string[];
    @ApiProperty()
    foiSorteado: boolean;
}