import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class CategoriaDto
{
    @ApiProperty()
    @IsNotEmpty({message:"El campo nombre es requerido"})
    nombre:string;


}