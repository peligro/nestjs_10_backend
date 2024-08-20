import { Body, Controller, Delete, Get, Header, HttpCode, HttpStatus, Param, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { EjemploDto } from 'src/dto/ejemplo.dto';
import { EjemploInterface } from 'src/interfaces/ejemplo-interface.interface';
import { EjemploService } from 'src/servicios/ejemplo.service';

@Controller('ejemplo')
@ApiTags("Ejemplo")
export class EjemploController {


    constructor(private ejemploService:EjemploService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    @Header('cabecero_cesar', 'Tamila.cl')
    index():EjemploInterface
    {
        
        return {estado:"ok", mensaje:"Método GET | service="+this.ejemploService.getTexto("césar")}
    }
    @Get(':id')
    show(@Param() params)
    {
        return "Método GET | id="+params.id;
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UsePipes(new ValidationPipe())
    create(@Body() dto:EjemploDto)
    {
        //return `Método POST | titulo=${dto.titulo} | descripcion=${dto.descripcion} | precio=${dto.precio} | categorias_id=${dto.categorias_id} | valido=${dto.valido}`;
        return {titulo:dto.titulo, descripcion:dto.descripcion, precio:dto.precio, categorias_id:dto.categorias_id, valido:dto.valido}
    }
    /*
    @Post()
    create(@Body() json)
    {
        return "Método POST | dato="+json.dato;
    }*/
    @Put(':id')
    update(@Param() params)
    {
        return "Método PUT | id="+params.id;
    }
    @Delete(':id')
    destroy(@Param() params)
    {
        return "Método DELETE | id="+params.id;
    }
    /*
    @Get()
    index()
    {
        console.log("código en terminal");
        return "Método GET";
    }
    @Post()
    create()
    {
        return "Método POST";
    }
    @Put()
    update()
    {
        return "Método PUT";
    }
    @Delete()
    destroy()
    {
        return "Método DELETE";
    }
    */
}
