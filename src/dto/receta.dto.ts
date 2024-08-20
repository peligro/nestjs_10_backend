import { ApiProperty } from "@nestjs/swagger";

export class RecetaDto
{
    @ApiProperty()
    nombre:string;
    @ApiProperty()
    tiempo:string;
    @ApiProperty()
    descripcion:string;
    @ApiProperty()
    categoria_id:string;
    @ApiProperty()
    usuario_id?:string;
}