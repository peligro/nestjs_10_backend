import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber } from "class-validator";


export class EjemploDto
{
    @ApiProperty()
    @IsNotEmpty({message:"El campo título es requerido"})
    titulo:string;


    @ApiProperty()
    @IsNotEmpty({message:"El campo descripción es requerido"})
    descripcion:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo precio es requerido"})
    @IsNumber({}, {message:"El precio debe ser numérico"})
    precio:number;

    @ApiProperty()
    @IsNotEmpty({message:"El campo categoria_id es requerido"})
    @IsNumber({}, {message:"El categoria_id debe ser numérico"})
    categoria_id:number;

    @ApiProperty()
    @IsNotEmpty({message:"El campo válido es requerido"})
    @IsBoolean({message:"El campo válido debe ser true o false"})
    valido: boolean;
}