import { Injectable } from '@nestjs/common';

@Injectable()
export class EjemploService {
    getTexto(parametro: string): string
    {
        return "El valor del parámetro es:"+parametro+" | test="+process.env.CURSO_TEST;
    }
}
