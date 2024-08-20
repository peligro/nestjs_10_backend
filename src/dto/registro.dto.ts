import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, Matches } from "class-validator";

export class RegistroDto
{
    @ApiProperty()
    @IsNotEmpty({ message: 'El campo nombre es requerido' })
    nombre:string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo correo es requerido' })
    @IsEmail({}, { message: 'El correo ingresado no es válido' })
    correo:string;

    @ApiProperty()
    @IsNotEmpty({ message: 'El campo password es requerido' })
    password:string;
}
/*
{
	"nombre":"Juan Pérez",
	"correo":"juanito@gmail.com",
	"password":"123456"
}
*/