import { Body, Controller, HttpCode, HttpStatus, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ContactoDto } from 'src/dto/contacto.dto';
import { ContactoService } from 'src/servicios/contacto.service';

@Controller('contacto')
@ApiTags("Contacto")
export class ContactoController 
{
    constructor(private contactoService:ContactoService){}

    @Post()
    @UsePipes(new ValidationPipe())
    @HttpCode(HttpStatus.CREATED)
    create(@Body() dto:ContactoDto)
    {
        return this.contactoService.addDatos(dto);
    }
}
