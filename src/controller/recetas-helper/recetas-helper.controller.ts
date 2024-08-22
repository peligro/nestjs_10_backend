import { Body, Controller,  FileTypeValidator, Get, HttpCode, HttpStatus, MaxFileSizeValidator, Param, ParseFilePipe, Post,  Query,  Req,  UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RecetasService } from 'src/servicios/recetas.service';
import { Request } from 'express';
import { RecetaDto } from 'src/dto/receta.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { JwtAuthGuard } from 'src/guard/jwt-auth/jwt-auth.guard';
import { ApiTags } from '@nestjs/swagger';

@Controller('recetas-helper')
@ApiTags("Recetas helper")
export class RecetasHelperController 
{
    
    constructor(private recetasService: RecetasService) { }
    
    @UseGuards(JwtAuthGuard)
    @Get('panel/:id')
    @HttpCode(HttpStatus.OK)
    async datos_panel(@Req() request: Request, @Param() params) {
        let datos = this.recetasService.getDatosPanel(params.id);
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

    @Get()
    @HttpCode(HttpStatus.OK)
    async datos_home(@Req() request: Request) {
        let datos = this.recetasService.getDatosHome();
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
    @Post(':id')
    @HttpCode(HttpStatus.OK)
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
    update(@Param() params, @UploadedFile(
        new ParseFilePipe(
            {
                validators:
                    [
                        new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' }),
                        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                    ]
            }),
    ) file: Express.Multer.File) {
        return this.recetasService.updateDatosFoto(params.id, file.filename);
    }
    @Get('buscador')
    @HttpCode(HttpStatus.OK)
    async buscador(@Query() query, @Req() request: Request) {
        let datos = this.recetasService.getDatosBuscador(query.categoria_id, query.search);
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
                    categoria: dato.categoria.nombre
                });
        }
        return array;
    }
}
