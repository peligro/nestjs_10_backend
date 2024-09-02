import { Controller, Get, Post, Put, Delete, Param, Body, UsePipes, ValidationPipe, Header, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EjemploDto } from 'src/dto/ejemplo.dto';
import { EjemploInterface } from 'src/interfaces/ejemplo-interface.interface';
import { EjemploService } from 'src/servicios/ejemplo.service';

@Controller('ejemplo')
@ApiTags("Ejemplo")
export class EjemploController 
{
    constructor(private ejemploService:EjemploService){}
    
    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('cabecero_cesar', 'cesarcancino.com')
    index():EjemploInterface
    {
        return {estado:"ok", mensaje:"Método GET | service="+this.ejemploService.getTexto("césar")};
    }

    @Get(":id")
    @HttpCode(HttpStatus.OK)
    show( @Param() param )
    {
        return {estado:"ok", mensaje:"Método GET | id="+param.id};
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    create(@Body() dto:EjemploDto)//contrato
    {
        return  {estado:"ok", mensaje:`Método POST | título=${dto.titulo} | descripción=${dto.descripcion}| precio=${dto.precio}| categoria_id=${dto.categoria_id}| válido=${dto.valido}`};
    }

    @Put(":id")
    @HttpCode(HttpStatus.OK)
    update(@Param() arg)
    {
        return {estado:"ok", mensaje:"Método PUT | id="+arg.id};
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    destroy(@Param() arg)
    {
        return {estado:"ok", mensaje:"Método DELETE | id="+arg.id};
    }
    /*
    @Get()
    index()
    {
        return "Método GET";
    }

    @Get(":id")
    show( @Param() param )
    {
        return "Método GET | id="+param.id;
    }

    @Post()
    @UsePipes(new ValidationPipe())
    create(@Body() dto:EjemploDto)//contrato
    {
        return  `Método POST | título=${dto.titulo} | descripción=${dto.descripcion}| precio=${dto.precio}| categoria_id=${dto.categoria_id}| válido=${dto.valido}`;
    }
    //@Post()
    //create(@Body() json)
    //{
     //   return `Método POST | json=${json.correo} | password=${json.password}`;
    //}

    @Put(":id")
    update(@Param() arg)
    {
        return "Método PUT | id="+arg.id;
    }

    @Delete(':id')
    destroy(@Param() arg)
    {
        return "Método Delete | id="+arg.id;
    }
    */
}
