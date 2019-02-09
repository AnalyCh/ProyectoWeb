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
import { ArtistaModule } from './artista/artista.module';
import { ArtistaPorBandaModule } from './artista-por-banda/artista-por-banda.module';
import { AutorModule } from './autor/autor.module';
import { BandaModule } from './banda/banda.module';
import { DiscoModule } from './disco/disco.module';
import { GeneroModule } from './genero/genero.module';
import { GeneroPorDiscoModule } from './genero-por-disco/genero-por-disco.module';
import { RolModule } from './rol/rol.module';

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
              dropSchema: false,
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
                  RolEntity
                  ]
          }
      ),
      UsuarioModule,
      CancionModule,
      ArtistaModule,
      ArtistaPorBandaModule,
      AutorModule,
      BandaModule,
      DiscoModule,
      GeneroModule,
      GeneroPorDiscoModule,
      RolModule,
      UsuarioModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
