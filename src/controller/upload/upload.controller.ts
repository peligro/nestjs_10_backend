import { Body, Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { diskStorage } from 'multer';//npm i -D @types/multer
import { extname } from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';


export class SampleDto
{
    producto_id:number;
}

@Controller('upload')
@ApiTags("Upload")
export class UploadController 
{

    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: diskStorage(
        {
            destination: './assets/uploads',
            filename:(req, file, callback)=>{
                callback(null, `${Date.now()}${extname(file.originalname)}`);
            }
        })})
    )
    metodoPost(@UploadedFile(
        new ParseFilePipe(
            {
                validators:
                [
                    new FileTypeValidator({fileType: '.(png|jpeg|jpg)'}),
                    new MaxFileSizeValidator({maxSize: 1024 * 1024 * 4}),
                ]
            })
    ) file: Express.Multer.File, @Body() dto: SampleDto)
    {
         
        return {estado:"ok", mensaje:"se subió el archivo", nombre: file.originalname, archivosubido:file.filename, mimetype:file.mimetype, producto_id:""+dto.producto_id}
    }
    /*
    @Post()
    @UseInterceptors(FileInterceptor('file', {storage: diskStorage(
        {
            destination: './assets/uploads',
            filename:(req, file, callback)=>{
                callback(null, `${Date.now()}${extname(file.originalname)}`);
            }
        })})
    )
    metodoPost(@UploadedFile() file: Express.Multer.File)
    {
         return {estado:"ok", mensaje:"se subió el archivo", nombre: file.originalname, archivosubido:file.filename, mimetype:file.mimetype}
    }
    */
}
