import {Module} from "@nestjs/common";
import { ArtistaPorBandaEntity } from "./artista-por-banda.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArtistaPorBandaController } from "./artista-por-banda.controller";
import { ArtistaPorBandaService } from "./artista-por-banda.service";
import {BandaService} from "../banda/banda.service";
import {BandaController} from "../banda/banda.controller";
import {BandaEntity} from "../banda/banda.entity";
import {ArtistaService} from "../artista/artista.service";
import {ArtistaEntity} from "../artista/artista.entity";
import {ArtistaController} from "../artista/artista. controller";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                ArtistaPorBandaEntity,
                BandaEntity,
                ArtistaEntity
            ]
    )
    ],
    controllers:[
        ArtistaPorBandaController,
        BandaController,
        ArtistaController
    ],
    providers:[
        ArtistaPorBandaService,
        BandaService,
        ArtistaService
    ],
    exports:[
        ArtistaPorBandaService
    ]
})
export class ArtistaPorBandaModule{}