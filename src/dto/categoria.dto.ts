import { ApiProperty } from "@nestjs/swagger";

export class CategoriaDto
{
    @ApiProperty()
    nombre:string;
    slug?:string;
}