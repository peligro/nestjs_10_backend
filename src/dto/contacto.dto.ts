import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class ContactoDto
{
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre es requerido' })
    nombre:string;

    @ApiProperty()    
    @IsNotEmpty({ message: 'El campo correo es requerido' })
    @IsEmail({}, { message: 'El correo ingresado no es válido' })
    correo:string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo telefono es requerido' })
    telefono:string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo mensaje es requerido' })
    mensaje:string;
}
/*
{
	"nombre":"Juan Pérez",
	"correo":"juanito@gmail.com",
	"telefono":"+569656565",
	"mensaje":"Hola necesito contactar al webmaster"
}
*/