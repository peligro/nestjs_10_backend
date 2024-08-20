import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class EjemploDto
{
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo título es requerido' })
    titulo:string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo descripción es requerido' })
    descripcion: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo precio es requerido' })
    @IsNumber({}, { message: 'El precio debe ser numérico' } )
    precio: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo categorias_id es requerido' })
    @IsNumber( )
    categorias_id: number;
    
    @ApiProperty()
    @IsBoolean({message:"El campo valido debe ser true o false"})
    valido: boolean;
}