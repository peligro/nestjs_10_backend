import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";


export class RecetaDto
{
    @ApiProperty()
    @IsNotEmpty({message:"El campo nombre es requerido"})
    nombre:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo tiempo es requerido"})
    tiempo:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo descripción es requerido"})
    descripcion:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo categoria_id es requerido"})
    categoria_id:string;
    
    @ApiProperty()
    usuario_id?: string;


}