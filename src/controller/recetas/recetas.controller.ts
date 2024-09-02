import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { RecetaDto } from 'src/dto/receta.dto';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { RecetasService } from 'src/servicios/recetas.service';

@Controller('recetas')
@ApiTags("Recetas")
export class RecetasController {

    constructor(private recetasService:RecetasService)
    {

    }

    @Get()
    @HttpCode(HttpStatus.OK)
    async index(@Req() request:Request)
    {
        let datos =  this.recetasService.getDatos();
        let array=Array();
        for(let dato of await datos)
        {
            array.push(
                {
                    id:dato.id,
                    nombre:dato.nombre,
                    slug:dato.slug,
                    tiempo:dato.tiempo,
                    fecha: dato.fecha.toLocaleDateString("es-CL"),
                    foto: `${request.protocol}://${request.get('Host')}/uploads/recetas/${dato.foto}`,
                    categoria_id:dato.categoria.id,
                    categoria:dato.categoria.nombre,
                    usuario_id:dato.usuario.id,
                    usuario:dato.usuario.nombre
                }
            );
        }
        return array;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async show(@Param() params, @Req() request:Request)
    {
        let dato =  await this.recetasService.getDato(parseInt(params.id));
        return  {
            id:dato.id,
            nombre:dato.nombre,
            slug:dato.slug,
            tiempo:dato.tiempo,
            fecha: dato.fecha.toLocaleDateString("es-CL"),
            foto: `${request.protocol}://${request.get('Host')}/uploads/recetas/${dato.foto}`,
            categoria_id:dato.categoria.id,
            categoria:dato.categoria.nombre,
            usuario_id:dato.usuario.id,
            usuario:dato.usuario.nombre
        }
    }

    @UseGuards(JwtAuthGuard)
    @Post()
    @HttpCode(HttpStatus.CREATED)
    @UseInterceptors(FileInterceptor('file', {storage: diskStorage(
        {
            destination: './assets/uploads/recetas',
            filename:(req, file, callback)=>{
                callback(null, `${Date.now()}${extname(file.originalname)}`);
            }
        })})
    )
    create(@UploadedFile(
        new ParseFilePipe(
            {
                validators:
                [
                    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                    new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
                ]
            })
    ) file: Express.Multer.File, @Body() dto:RecetaDto)
    {
        return this.recetasService.addDatos(dto, file.filename);
    }

    /*
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto:RecetaDto)
    {
        return this.recetasService.addDatos(dto, "1725054433754.png");
    }
    */
    @UseGuards(JwtAuthGuard)
    @Put(':id')
    @HttpCode(HttpStatus.OK)
    update(@Param() params, @Body() dto:RecetaDto)
    {
        return this.recetasService.updateDatos(parseInt(params.id), dto)
    }
    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    @HttpCode(HttpStatus.OK)
    destroy(@Param() params)
    {
        return this.recetasService.deleteDato(parseInt(params.id));
    }
}

