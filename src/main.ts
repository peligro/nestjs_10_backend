import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    //swagger

  const config = new DocumentBuilder()
  .setTitle('API desde el curso fullstack')
  .setDescription('API creada de ejemplo para curso fullstack con Nestjs y Prisma ORM')
  .setVersion('1.0.0')
  .addTag("Recetas")
  .addTag("Categorías")
  .addTag("Usuarios")
  .addTag("Contacto")
  .addTag("Ejemplo")
  .addTag("Upload")
  .addTag("Recetas helper")
  .build();
  let document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('documentacion', app, document);
    //habilitar CORS
    app.enableCors();
   //configurar prefijo global
   app.setGlobalPrefix('api/v1');
  await app.listen(process.env.CURSO_SERVER_PORT);
}
bootstrap();
