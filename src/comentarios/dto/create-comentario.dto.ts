import { ApiProperty } from "@nestjs/swagger";

export class CreateComentarioDto {
    @ApiProperty()
    texto: string;
}
