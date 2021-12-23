import { ApiProperty } from "@nestjs/swagger";

export class CreateJogoDto {
    @ApiProperty()
    titulo: string;
}
