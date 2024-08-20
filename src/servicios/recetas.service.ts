import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { RecetaDto } from 'src/dto/receta.dto';
import slugify from 'slugify';
import * as fs from 'fs'; 
 
 
 

@Injectable()
export class RecetasService {
    private prisma: any;
    constructor() {
        this.prisma = new PrismaClient();
    }
    async getDatos() {
        return await this.prisma.receta.findMany
            (
                {
                    orderBy: [{ id: 'desc' }],
                     
                    select: {
                        id: true,
                        nombre: true,
                        slug: true,
                        tiempo: true,
                        descripcion: true,
                        fecha: true,
                        foto: true,
                        categoria: true,
                        usuario:true
                    }

                }
            );
    }
    /*
    async getDatos() {
        return await this.prisma.receta.findMany
            (
                {
                    orderBy: [{ id: 'desc' }],
                    skip: 9,
                    take: 3,
                    select: {
                        id: true,
                        nombre: true,
                        slug: true,
                        tiempo: true,
                        descripcion: true,
                        fecha: true,
                        foto: true,
                        categoria: true,
                        usuario:true
                    }

                }
            );
    }*/
    async getDato(id: any) {
        let datos = await this.prisma.receta.findFirst(
            {
                where:
                {
                    id: id
                }, select: {
                    id: true,
                    nombre: true,
                    slug: true,
                    tiempo: true,
                    descripcion: true,
                    fecha: true,
                    foto: true,
                    categoria: true,
                    usuario:true
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
    async addDatos(dto: RecetaDto, foto:any) {
        let categoria = await this.prisma.categoria.findFirst(
            {
                where:
                {
                    id: parseInt(dto.categoria_id)
                }
            });
        if (!categoria) {
            fs.unlink(`./assets/uploads/recetas/${foto}`, () => { });
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
        let existe = await this.prisma.receta.findFirst(
            {
                where:
                {
                    nombre: dto.nombre
                }
            });
        if (existe) {
            fs.unlink(`./assets/uploads/recetas/${foto}`, () => { });
            throw new HttpException(`El registro ${dto.nombre} ya existe en el sistema`, HttpStatus.BAD_REQUEST);
        } else {
            await this.prisma.receta.create
                (
                    {
                        data:
                        {
                            nombre: dto.nombre,
                            slug: slugify(dto.nombre.toLowerCase()),
                            tiempo:dto.tiempo,
                            descripcion:dto.descripcion,
                            categoria_id:parseInt(dto.categoria_id),
                            usuario_id:parseInt(dto.usuario_id),
                            foto:foto 
                        }
                    }
                );
            return { estado: "ok", mensaje: "Se crea el registro exitosamente" }
        }
    } 
    async updateDatos(id: any, dto: RecetaDto) {
        let datos = await this.prisma.receta.findFirst(
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
            await this.prisma.receta.update(
                {
                    where:
                    {
                        id: id
                    },
                    data:
                    {
                        nombre: dto.nombre,
                        slug: slugify(dto.nombre.toLowerCase()),
                        tiempo:dto.tiempo,
                        descripcion:dto.descripcion,
                        categoria_id:parseInt(dto.categoria_id),
                    }
                });
            return { estado: "ok", mensaje: "Se modificó el registro exitosamente" }
        }
    }
    async deleteDato(id: any) {
        let existe = await this.prisma.receta.findFirst(
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
        fs.unlink(`./assets/uploads/recetas/${existe.foto}`, () => { });
        await this.prisma.receta.delete(
            {
                where:
                {
                    id: id
                }
            });
        return { estado: 'ok', mensaje: 'Se eliminó el registro exitosamente' }
    }
    /////MÉTODOS HELPERS
    async updateDatosFoto(id: any, foto: any) {
        let datos = await this.prisma.receta.findFirst(
            {
                where:
                {
                    id: parseInt(id)
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
            fs.unlink(`./assets/uploads/recetas/${datos.foto}`, () => { });
            await this.prisma.receta.update(
                {
                    where:
                    {
                        id: parseInt(id)
                    },
                    data:
                    {
                        foto: foto
                    }
                });
            return { estado: "ok", mensaje: "Se modificó el registro exitosamente" }
        }
    }
    async getDatosHome() {
        
        return await this.prisma.receta.findMany
            (
                {
                   
                    orderBy: [{ id: 'desc' }],
                    skip: 0,
                    take: 3,
                    select: {
                        id: true,
                        nombre: true,
                        slug: true,
                        tiempo: true,
                        descripcion: true,
                        fecha: true,
                        foto: true,
                        categoria: true,
                        usuario:true
                    }

                }
            );
    }
    async getDatosBuscador(categoria_id:any, search:any) {
        
        return await this.prisma.receta.findMany
            (
                {
                    where:
                    {
                        categoria_id: parseInt(categoria_id),
                        nombre: {
                            contains: search,
                          }
                    },
                    orderBy: [{ id: 'desc' }],
                    skip: 0,
                    take: 3,
                    select: {
                        id: true,
                        nombre: true,
                        slug: true,
                        tiempo: true,
                        descripcion: true,
                        fecha: true,
                        foto: true,
                        categoria: true,
                        usuario:true
                    }

                }
            );
    }
    async getDatosPanel(id:any) {
        
        return await this.prisma.receta.findMany
            (
                {
                    where:
                    {
                        usuario_id: parseInt(id)
                    },
                    orderBy: [{ id: 'desc' }],
                    select: {
                        id: true,
                        nombre: true,
                        slug: true,
                        tiempo: true,
                        descripcion: true,
                        fecha: true,
                        foto: true,
                        categoria: true,
                        usuario:true
                    }

                }
            );
    }
}


 