import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";


export class LoginDto
{
    @ApiProperty()
    @IsNotEmpty({message:"El campo correo es requerido"})
    @IsEmail({}, {message:"El correo ingresado no es válido"})
    correo:string;

    @ApiProperty()
    @IsNotEmpty({message:"El campo password es requerido"})
    password:string;



}