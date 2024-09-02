import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class ContactoDto
{
    @ApiProperty()
    @IsNotEmpty({message:"El campo nombre es requerido"})
    nombre:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo correo es requerido"})
    @IsEmail({}, {message:"El correo ingresado no es válido"})
    correo:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo teléfono es requerido"})
    telefono:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo mensaje es requerido"})
    mensaje:string;


}