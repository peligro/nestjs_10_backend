import { Body, Controller, Delete, FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post, Put, Req, UploadedFile, UseInterceptors } from '@nestjs/common';
import { RecetasService } from 'src/servicios/recetas.service';
import { Request } from 'express';
import { RecetaDto } from 'src/dto/receta.dto';

//upload
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';//npm i -D @types/multer
import { extname } from 'path';
import { ApiTags } from '@nestjs/swagger';

@Controller('recetas')
@ApiTags("Recetas")
export class RecetasController {
    constructor(private recetasService: RecetasService) { }


    @Get()
    @HttpCode(HttpStatus.OK)
    async index(@Req() request: Request) {
        let datos = this.recetasService.getDatos();
        let array = Array();
        for (let dato of await datos) {
            array.push(
                {
                    id: dato.id,
                    nombre: dato.nombre,
                    slug: dato.slug,
                    tiempo: dato.tiempo,
                    descripcion: dato.descripcion,
                    fecha: dato.fecha.toLocaleDateString("es-CL"),
                    foto: `${request.protocol}://${request.get('Host')}/uploads/recetas/${dato.foto}`,
                    categoria_id: dato.categoria.id,
                    categoria: dato.categoria.nombre,
                    usuario_id: dato.usuario.id,
                    usuario: dato.usuario.nombre
                });
        }
        return array;
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async show(@Param() params, @Req() request: Request) {
        let dato = await this.recetasService.getDato(parseInt(params.id));

        return {
            id: dato.id,
            nombre: dato.nombre,
            slug: dato.slug,
            tiempo: dato.tiempo,
            descripcion: dato.descripcion,
            fecha: dato.fecha.toLocaleDateString("es-CL"),
            foto: `${request.protocol}://${request.get('Host')}/uploads/recetas/${dato.foto}`,
            categoria_id: dato.categoria.id,
            categoria: dato.categoria.nombre,
            usuario_id: dato.usuario.id,
            usuario: dato.usuario.nombre
        };
    }
    @Post()
    @UseInterceptors(FileInterceptor('file', {
        storage: diskStorage(
            {
                destination: './assets/uploads/recetas',
                filename: (req, file, callback) => {
                    callback(null, `${Date.now()}${extname(file.originalname)}`);
                }
            })
    }))
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: RecetaDto, @UploadedFile(
        new ParseFilePipe(
            {
                validators:
                    [
                        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                    ]
            }),
    ) file: Express.Multer.File) {
        return this.recetasService.addDatos(dto, file.filename);
    }
    /*
    {
        "nombre": "Cazuela de vacuno 4",
        "tiempo": "una hora y media",
        "descripcion":"descripción con ñandú",
        "categoria_id":7
}
    */
    /*
    @Post()
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto: RecetaDto) {
        return this.recetasService.addDatos(dto, "ssss");
    }*/
    @Put(':id')
    update(@Param() params, @Body() dto: RecetaDto) {
        return this.recetasService.updateDatos(parseInt(params.id), dto);
    }
    @Delete(':id')
    destroy(@Param() params)
    {
        return this.recetasService.deleteDato(parseInt(params.id));
    }
}
