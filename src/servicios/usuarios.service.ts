import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RegistroDto } from 'src/dto/registro.dto';
import * as bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { MailerService } from '@nestjs-modules/mailer';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UsuariosService {
    private prisma: any;
    constructor(private readonly mailService: MailerService, private jwtService: JwtService) {
        this.prisma = new PrismaClient();
    }
    async addDatos(dto: RegistroDto, request: any) {
        let existe = await this.prisma.usuario.findFirst(
            {
                where:
                {
                    correo: dto.correo
                }
            });
        if (existe) {
            throw new HttpException(`Ocurrió un error inesperado, por favor vuelva a intentarlo más tarde.`, HttpStatus.BAD_REQUEST);
        } else {
            let token = uuidv4();
            let url = `${request.protocol}://${request.get('Host')}/api/v1/usuarios/verificacion/${token}`;
            await this.prisma.usuario.create(
                {
                    data:
                    {
                        nombre: dto.nombre,
                        correo: dto.correo,
                        password: await bcrypt.hash(dto.password, 10),
                        token: token
                    }
                });
            //envío mail

            await this.mailService.sendMail({
                from: 'Verificación de cuenta <yo@cesarcancino.com>',
                to: dto.correo,
                subject: 'Prueba nestjs',
                html: `Hola ${dto.nombre} te haz registrado exitosamente en nuestra plataforma, por favor haz clic aquí para verificar tu mail:
            <br/>
            <a href="${url}">${url}</a>
            <br/>
            o copia y pega la siguiente URL en la barra de direcciones de tu navegador favorito
            <br/>
            ${url}`,
            });
            return { estado: "ok", mensaje: "Se creó el registro exitosamente" }
        }
    }
    async updateDatosVerificacion(token: any, response:any) {
        let datos = await this.prisma.usuario.findFirst(
            {
                where:
                {
                    token: token,
                    estado_id: 2
                }
            });
        if (!datos) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    error: 'El registro no existe en el sistema',
                },
                HttpStatus.BAD_REQUEST, {
                cause:
                {
                    name: "",
                    message: ""
                }
            });
        } else {
            await this.prisma.usuario.update(
                {
                    where:
                    {
                        id: datos.id 
                    },
                    data:
                    {
                        token: "",
                        estado_id: 1
                    }
                });
            return response.redirect('http://192.168.1.88:5173/login');
        }
    }
    async getLogin(correo: string, password: string) {
        let datos = await this.prisma.usuario.findFirst(
            {
                where:
                {
                    correo: correo,
                    estado_id:1
                }
            });
        if (datos) {
            let isMatch = await bcrypt.compare(password, datos.password);
            if (isMatch) {
                let payload = {nombre: datos.nombre, sub: datos.id};
                return {
           
                    id:datos.id,
                    nombre: datos.nombre,
                    token: this.jwtService.sign(payload)
                };
            } else {
                throw new HttpException(`Las crendenciales ingresadas no son válidas`, HttpStatus.BAD_REQUEST);
            }
        } else {
            throw new HttpException(`Las crendenciales ingresadas no son válidas`, HttpStatus.BAD_REQUEST);
        }
    }
}
