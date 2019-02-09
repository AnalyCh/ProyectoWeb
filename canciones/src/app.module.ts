import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {DescripcionGeneroEntity} from "./descripcion-genero/descripcion-genero.entity";
import {GeneroEntity} from "./genero/genero.entity";
import {CancionEntity} from "./cancion/cancion.entity";
import {DiscoEntity} from "./disco/disco-entity";
import {CancionModule} from "./cancion/cancion.module";

@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
              type: 'mysql',
              host: 'localhost',
              port: 32775,
              database: 'web',
              username: 'root',
              password: 'root',
              synchronize: true,
              dropSchema: false,
              entities: [
                  UsuarioEntity,
                  DescripcionGeneroEntity,
                  GeneroEntity,
                  CancionEntity,
                  DiscoEntity,
              ]
          }
      ),
      UsuarioModule,
      CancionModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
