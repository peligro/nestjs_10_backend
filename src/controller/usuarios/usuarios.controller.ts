import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Req, Res } from '@nestjs/common';
import { RegistroDto } from 'src/dto/registro.dto';
import { UsuariosService } from 'src/servicios/usuarios.service';
import { Request, Response } from 'express';
import { LoginDto } from 'src/dto/login.dto';
import { ApiTags } from '@nestjs/swagger';
@Controller('usuarios')
@ApiTags("Usuarios")
export class UsuariosController 
{
    constructor(private usuariosService: UsuariosService){}
    

    @Post('login')
    @HttpCode(HttpStatus.OK)
    async login(@Body() dto: LoginDto)
    {
        return this.usuariosService.getLogin(dto.correo, dto.password);
    }


    @Get('verificacion/:token')
    verificacion(@Param() params, @Res() response: Response)
    {
        return this.usuariosService.updateDatosVerificacion(params.token, response);
    }
     
    @Post('registro')
    @HttpCode(HttpStatus.CREATED)
    registro(@Body() dto: RegistroDto, @Req() request: Request)
    {
        return this.usuariosService.addDatos(dto, request);
    }
}
