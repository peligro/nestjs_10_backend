import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';    
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //swagger
  const config = new DocumentBuilder()
  .setTitle("Api desde Tamila para Nestjs")
  .setDescription('API de ejemplo para curso de Nestjs')
  .setVersion('1.0.0')
  .addTag("Recetas")
  .addTag("Categorías")
  .addTag("Usuarios")
  .addTag("Contacto")
  .addTag("Ejemplo")
  .addTag("Recetas helper")
  .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);

  //habilitar cors
  app.enableCors();
  //aplicamos pipe de validación de forma global
  /*
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,//el whitelist es para que si recibe más campos adicionales a los declarados en el dto, los ignore
  }));
  */
  //configurar prefijo global
  app.setGlobalPrefix('api/v1');
  //despliegue en puerto
  await app.listen(process.env.CURSO_SERVER_PORT);
}
bootstrap();
