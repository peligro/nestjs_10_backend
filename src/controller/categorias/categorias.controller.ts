import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriaDto } from 'src/dto/categoria.dto';
import { CategoriasService } from 'src/servicios/categorias.service';

@Controller('categorias')
@ApiTags("Categorías")
export class CategoriasController 
{

    constructor(private categoriaService:CategoriasService){}

    @Get()
    @HttpCode(HttpStatus.OK)
    index()
    {
        return this.categoriaService.getDatos();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    show(@Param() params)
    {
        return this.categoriaService.getDato(parseInt(params.id));
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto:CategoriaDto)
    {
        return this.categoriaService.addDatos(dto);
    }

    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param() params, @Body() dto:CategoriaDto)
    {
        return this.categoriaService.updateDatos(parseInt(params.id), dto)
    }

    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    destroy(@Param() params)
    {
        return this.categoriaService.deleteDato(parseInt(params.id));
    }
}
