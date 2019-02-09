import {Module} from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { BandaEntity } from "./banda.entity";
import { BandaController } from "./banda.controller";
import { BandaService } from "./banda.service";
import {ArtistaEntity} from "../artista/artista.entity";
import {ArtistaController} from "../artista/artista. controller";
import {ArtistaService} from "../artista/artista.service";

@Module({
    imports:[
        TypeOrmModule.forFeature(
            [
                BandaEntity,
                ArtistaEntity
            ]
    )
    ],
    controllers:[
        BandaController,
        ArtistaController
    ],
    providers:[
        BandaService,
        ArtistaService
    ],
    exports:[
        BandaService
    ]
})
export class BandaModule{}