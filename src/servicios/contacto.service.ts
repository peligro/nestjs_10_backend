import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { ContactoDto } from 'src/dto/contacto.dto';
import { MailerService } from '@nestjs-modules/mailer';
@Injectable()
export class ContactoService {
    private prisma: any;
    constructor(private readonly mailService: MailerService) {
        this.prisma = new PrismaClient();
    }
    async addDatos(dto: ContactoDto) {
        //creo registro
        await this.prisma.contacto.create
            (
                {
                    data:
                    {
                        nombre: dto.nombre,
                        correo: dto.correo,
                        telefono: dto.telefono,
                        mensaje: dto.mensaje
                    }
                }
            );
        //envío mail
        await this.mailService.sendMail({
            from: '"Prueba nestjs" <yo@cesarcancino.com>',
            to: dto.correo,
            // from: '"Support Team" <support@example.com>', // override default from
            subject: 'Prueba nestjs',
            html: dto.mensaje,
          });
        //retorno    
        return { estado: "ok", mensaje: "Se crea el registro exitosamente" }

    }
}
