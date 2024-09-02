import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Request, Response } from 'express';
import { LoginDto } from 'src/dto/login.dto';
import { RegistroDto } from 'src/dto/registro.dto';
import { UsuariosService } from 'src/servicios/usuarios.service';

@Controller('usuarios')
@ApiTags("Usuarios")
export class UsuariosController 
{
    constructor(private usuariosService:UsuariosService) {
        
    }

    @Get('verificacion/:token')
    @HttpCode(HttpStatus.OK)
    verificacion(@Param() params, @Res() response: Response)
    {
        return this.usuariosService.updateDatosVerificacion(params.token, response);
    }
    @Post('login')
    @HttpCode(HttpStatus.OK)
    login(@Body() dto:LoginDto, @Req() request: Request)
    {
        return this.usuariosService.getLogin(dto.correo, dto.password);
    }


    @Post('registro')
    @HttpCode(HttpStatus.CREATED)
    registro(@Body() dto:RegistroDto, @Req() request: Request)
    {
        return this.usuariosService.addDatos(dto, request);
    }
}
