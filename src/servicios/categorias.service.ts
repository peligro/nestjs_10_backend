import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import slugify from 'slugify';//npm i slugify
import { CategoriaDto } from 'src/dto/categoria.dto';
@Injectable()
export class CategoriasService {
    private prisma: any;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async getDatos() {
        return await this.prisma.categoria.findMany
            (
                {
                    orderBy: [{ id: 'desc' }]
                }
            );
    }
    async getDato(id: any) {
        let datos = await this.prisma.categoria.findFirst(
            {
                where:
                {
                    id: id
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
            return datos;
        }
    }
    async addDatos(dto: CategoriaDto) {
        let existe = await this.prisma.categoria.findFirst(
            {
                where:
                {
                    nombre: dto.nombre
                }
            });
        if (existe) {
            throw new HttpException(`El registro ${dto.nombre} ya existe en el sistema`, HttpStatus.BAD_REQUEST);
        } else {
            await this.prisma.categoria.create
                (
                    {
                        data:
                        {
                            nombre: dto.nombre,
                            slug: slugify(dto.nombre.toLowerCase())
                        }
                    }
                );
            return { estado: "ok", mensaje: "Se crea el registro exitosamente" }
        }
    }
    async updateDatos(id: any, dto: CategoriaDto) {
        let datos = await this.prisma.categoria.findFirst(
            {
                where:
                {
                    id: id
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
            await this.prisma.categoria.update(
                {
                    where:
                    {
                        id: id
                    },
                    data:
                    {
                        nombre: dto.nombre,
                        slug: slugify(dto.nombre.toLowerCase())
                    }
                });
            return { estado: "ok", mensaje: "Se modificó el registro exitosamente" }
        }
    }
    async deleteDato(id: any) {
        let existe = await this.prisma.categoria.findFirst(
            {
                where:
                {
                    id: id
                }
            });
        if (!existe) {
            throw new HttpException(
                {
                    estado: HttpStatus.BAD_REQUEST,
                    error: 'Ocurrió un error inesperado',
                },
                HttpStatus.BAD_REQUEST, {
                cause:
                {
                    name: "",
                    message: ""
                }
            });
        }
        let datos = await this.prisma.receta.findMany(
            {
                where:
                {
                    categoria_id: id
                }
            });
        if (datos.length == 0) {
            await this.prisma.categoria.delete(
                {
                    where:
                    {
                        id: id
                    }
                });
            return { estado: 'ok', mensaje: 'Se eliminó el registro exitosamente' }
        } else {
            throw new HttpException(`No es posible eliminar el registro en este momento`, HttpStatus.BAD_REQUEST);
        }
    }
}
