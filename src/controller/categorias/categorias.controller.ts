import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoriaDto } from 'src/dto/categoria.dto';
import { CategoriasService } from 'src/servicios/categorias.service';

@Controller('categorias')
@ApiTags("Categorías")
export class CategoriasController {
    constructor(private categoriasService: CategoriasService) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    index() {
        return this.categoriasService.getDatos();
    }
    @Get(':id')
    @HttpCode(HttpStatus.OK)
    show(@Param() params) {
        return this.categoriasService.getDato(parseInt(params.id));
    }
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: CategoriaDto) {
        return this.categoriasService.addDatos(dto);
    }
    @Put(':id')
    update(@Param() params, @Body() dto: CategoriaDto) {
        return this.categoriasService.updateDatos(parseInt(params.id), dto);
    }
    @Delete(':id')
    destroy(@Param() params)
    {
        return this.categoriasService.deleteDato(parseInt(params.id));
    }
}
