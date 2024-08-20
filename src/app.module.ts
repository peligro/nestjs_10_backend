import { Module } from '@nestjs/common';
import { EjemploController } from './controller/ejemplo/ejemplo.controller';
import { EjemploService } from './servicios/ejemplo.service';
import { UploadController } from './controller/upload/upload.controller';

//archivos estáticos
////https://docs.nestjs.com/recipes/serve-static#configuration
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { CategoriasService } from './servicios/categorias.service';
import { CategoriasController } from './controller/categorias/categorias.controller';
import { RecetasController } from './controller/recetas/recetas.controller';
import { RecetasService } from './servicios/recetas.service';
import { RecetasHelperController } from './controller/recetas-helper/recetas-helper.controller';
import { ContactoController } from './controller/contacto/contacto.controller';
import { ContactoService } from './servicios/contacto.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { UsuariosService } from './servicios/usuarios.service';
import { UsuariosController } from './controller/usuarios/usuarios.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt/jwt.strategy';
 

@Module({
  imports: [
    ConfigModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'assets'),
    }) ,
    MailerModule.forRoot({
      transport: {
        host: process.env.SMTP_SERVER,
        secure: false,
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      } 
    }),
    JwtModule.register(
      {
        secret: process.env.CURSO_SERVER_JWT_SECRET,
        signOptions: {expiresIn: '24h'}//equivalente a un día
      }),
  ],
  controllers: [ EjemploController, UploadController, CategoriasController, RecetasController, RecetasHelperController, ContactoController, UsuariosController],
  providers: [EjemploService, CategoriasService, RecetasService, ContactoService, UsuariosService, JwtStrategy],
})
export class AppModule {}
