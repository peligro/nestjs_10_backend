import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';//npm i -D @types/multer
import {extname} from 'path';

export class SampleDto
    {
        producto_id: number;
    }

@Controller('upload')
export class UploadController 
{
    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: diskStorage(
        {
            destination: './assets/uploads',
            filename: (req, file, callback)=>
            {
                callback(null, `${Date.now()}${extname(file.originalname)}`);
            }
        })} ))
    metodoPost(@Body() dto: SampleDto, @UploadedFile(
            new ParseFilePipe(
                {
                    validators:
                    [
                        new FileTypeValidator({fileType: '.(png|jpeg|jpg)' }),
                        new MaxFileSizeValidator({ maxSize: 1024 * 1024 * 4 }),
                    ]
                }),
        ) file: Express.Multer.File)
        {
            console.log(dto);
            return {estado:"ok", mensaje:"subiendo archivos", archivo:file.originalname, archivosubido:file.filename, mime:file.mimetype, producto_id:dto.producto_id};
        }
}
