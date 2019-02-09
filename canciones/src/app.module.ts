import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {UsuarioModule} from "./usuario/usuario.module";
import {UsuarioEntity} from "./usuario/usuario.entity";
import {TypeOrmModule} from '@nestjs/typeorm';
import {GeneroEntity} from "./genero/genero.entity";
import {CancionEntity} from "./cancion/cancion.entity";
import {DiscoEntity} from "./disco/disco.entity";
import {CancionModule} from "./cancion/cancion.module";
import {GeneroPorDiscoEntity} from "./genero-por-disco/genero-por-disco.entity";
import {AutorEntity} from "./autor/autor.entity";
import {ArtistaEntity} from "./artista/artista.entity";
import {ArtistaPorBandaEntity} from "./artista-por-banda/artista-por-banda.entity";
import {BandaEntity} from "./banda/banda.entity";
import {RolEntity} from "./rol/rol.entity";
import {RolPorUsuarioEntity} from "./rol-por-usuario/rol-por-usuario.entity";

@Module({
  imports: [
      TypeOrmModule.forRoot(
          {
              type: 'mysql',
              host: 'localhost',
              port: 32775 ,
              database: 'web',
              username: 'root',
              password: 'root',
              synchronize: true,
              dropSchema: true,
              entities: [
                  UsuarioEntity,
                  GeneroEntity,
                  CancionEntity,
                  DiscoEntity,
                  GeneroPorDiscoEntity,
                  AutorEntity,
                  ArtistaEntity,
                  ArtistaPorBandaEntity,
                  BandaEntity,
                  RolEntity,
                  RolPorUsuarioEntity
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
