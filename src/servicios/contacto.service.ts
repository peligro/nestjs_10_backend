import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ContactoDto } from 'src/dto/contacto.dto';
//npm install --save @nestjs-modules/mailer nodemailer
//npm install --save-dev @types/nodemailer
@Injectable()
export class ContactoService 
{
    private prisma: any;
    constructor(private mailService:MailerService) {
        this.prisma = new PrismaClient();
    }

    async addDatos(dto:ContactoDto)
    {
        //crear registro
        await this.prisma.contacto.create(
            {
                data:
                {
                    nombre: dto.nombre,
                    correo: dto.correo,
                    telefono: dto.telefono,
                    mensaje: dto.mensaje
                }
            });
        //envía el mail
        await this.mailService.sendMail(
            {
                from:'Prueba nestjs "<yo@cesarcancino.com>"',
                to: dto.correo,
                subject:'Prueba nestjs contacto',
                html: dto.mensaje
            });
        
        return {estado: 'ok', mensaje: 'Se crea el registro exitosamente'}
    }
}
